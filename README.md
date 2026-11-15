# @fi-workers/lint

fi-workers 레포가 함께 쓰는 엄격한 린트·포맷·TypeScript 설정입니다.

| 역할                  | 도구                                                                                  | 이 패키지가 주는 것                                                |
| --------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 린트 (타입 정보 포함) | [Oxlint](https://oxc.rs) + [oxlint-tsgolint](https://github.com/oxc-project/tsgolint) | `oxlint` 프리셋: base, react, next, node, test, tauri              |
| 타입 검사             | TypeScript 7 (tsgolint의 `typeCheck`)                                                 | `tsconfig` 베이스: base, node, react                               |
| 포맷                  | [Oxfmt](https://oxc.rs/docs/guide/usage/formatter)                                    | `oxfmt` 공통 옵션                                                  |
| 미사용 코드·의존성    | [knip](https://knip.dev)                                                              | `knip` 공통 옵션                                                   |
| 금지 구문             | [ast-grep](https://ast-grep.github.io)                                                | `ast-grep/rules` (enum, `for...in`, label, `with`, barrel index)   |
| React 품질 진단       | react-doctor                                                                          | 포함하지 않음. [docs/react-doctor.md](./docs/react-doctor.md) 참고 |

빌드 단계는 없습니다. 패키지는 `.js` 설정 파일과 `.d.ts` 타입 선언만으로 이루어져 있습니다.

## 기준

- **모든 레포는 TypeScript 7을 씁니다.** 타입 정보를 쓰는 린트 규칙(`typeAware`)과 타입 검사(`typeCheck`)를 tsgolint가 한 번에 돌리고, 이것이 `tsc --noEmit`을 대신합니다.
- **경고는 없습니다.** 규칙은 error 아니면 off입니다. CI는 `--deny-warnings`로 돌립니다.
- **Oxlint 카테고리:** correctness, suspicious, perf, pedantic은 카테고리 전체를 error로 켭니다. style과 restriction은 airbnb 스타일 가이드와 typescript-eslint의 strict/stylistic type-checked 세트에 해당하는 규칙만 골라서 켭니다. nursery는 끕니다(typescript-eslint strict 세트에 속하는 `no-unnecessary-condition`, `prefer-optional-chain` 두 개만 예외).
- **끈 규칙은 이유를 적습니다.** `oxlint/base.js`의 주석을 보세요. 레포 사정으로 규칙을 더 꺼야 하면 공용 프리셋이 아니라 그 레포 설정에서, 주석과 추적 이슈를 남기고 끕니다.

## 설치 (GitHub Packages)

패키지는 GitHub Packages의 npm 레지스트리(`npm.pkg.github.com`)에만 올라갑니다. npm 공개 레지스트리에는 없습니다. GitHub Packages는 공개 패키지도 설치할 때 토큰이 필요합니다.

1. 레포 루트에 `.npmrc`를 둡니다.

   ```ini
   @fi-workers:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
   ```

2. 로컬에서는 `read:packages` 권한이 있는 토큰을 `NODE_AUTH_TOKEN`으로 넣습니다.

   ```sh
   gh auth refresh -s read:packages   # 한 번만
   export NODE_AUTH_TOKEN="$(gh auth token)"
   ```

3. CI(GitHub Actions)에서는 `GITHUB_TOKEN`을 씁니다.

   ```yaml
   permissions:
     contents: read
     packages: read
   # ...
   - run: pnpm install --frozen-lockfile
     env:
       NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

4. 버전을 정확히 고정해서 설치합니다. 도구들은 이 패키지가 고정한 버전과 같게 맞춥니다(`peerDependencies` 참고).

   ```sh
   pnpm add -D -E @fi-workers/lint@0.1.0 oxlint@1.93.0 oxlint-tsgolint@7.0.2007 oxfmt@0.78.0 typescript@7.0.2 knip@6.45.1 @ast-grep/cli@0.51.2
   ```

   pnpm의 `minimumReleaseAge`를 켠 레포는 새 버전을 올린 직후 하루 동안 설치가 막힐 수 있습니다. 그때는 `pnpm-workspace.yaml`의 `minimumReleaseAgeExclude`에 `@fi-workers/lint`를 넣습니다.

## 사용법

### Oxlint

`oxlint.config.ts`를 씁니다. `.oxlintrc.json`은 패키지를 import할 수 없습니다. 루트 `package.json`에 `"type": "module"`이 있어야 합니다.

```ts
// oxlint.config.ts
import base from '@fi-workers/lint/oxlint';
import react from '@fi-workers/lint/oxlint/react';
import test from '@fi-workers/lint/oxlint/test';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base, react, test],
  // 아래 세 가지는 extends로 상속되지 않습니다. 반드시 루트 설정에 둡니다.
  options: {
    typeAware: true,
    typeCheck: true,
    denyWarnings: true,
    reportUnusedDisableDirectives: 'error',
  },
  ignorePatterns: ['dist/**', '**/generated/**'],
});
```

| 프리셋                          | 언제                                    | 앞에 둘 것  |
| ------------------------------- | --------------------------------------- | ----------- |
| `@fi-workers/lint/oxlint`       | 모든 TS 레포                            | —           |
| `@fi-workers/lint/oxlint/node`  | 서버, CLI, 스크립트                     | base        |
| `@fi-workers/lint/oxlint/react` | React 앱                                | base        |
| `@fi-workers/lint/oxlint/next`  | Next.js 앱                              | base, react |
| `@fi-workers/lint/oxlint/tauri` | Tauri 웹뷰 프런트 (Node 내장 모듈 금지) | base, react |
| `@fi-workers/lint/oxlint/test`  | Vitest 테스트 파일                      | 맨 뒤       |

- 하위 폴더에 다른 `oxlint.config.ts`가 있으면 Oxlint가 그것도 읽습니다. `typeAware`는 루트 설정에만 둘 수 있으므로, 필요하면 `oxlint --disable-nested-config`로 실행합니다.
- `react` 프리셋은 `react_perf` 플러그인을 켭니다. React Compiler를 쓰는 레포는 컴파일러가 메모이제이션을 맡으므로 `react-perf/*` 규칙을 루트 설정에서 끄고, 끈 이유를 주석으로 남깁니다.
- 기본 내보내기(`export default`)는 막혀 있습니다. `*.config.*`와 `*.d.ts`는 허용되고, Next 프리셋은 라우트 파일을 허용합니다.

### TypeScript

```jsonc
// tsconfig.json
{
  "extends": "@fi-workers/lint/tsconfig/react.json", // 또는 base.json, node.json
  "include": ["src"],
}
```

`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, `verbatimModuleSyntax`, `erasableSyntaxOnly` 등을 켭니다. `baseUrl`은 쓰지 않습니다(TS 7과 tsgolint가 지원하지 않음). 경로 별칭은 `paths`나 `package.json`의 `imports`(`#alias`)로 정합니다.

### Oxfmt

```ts
// oxfmt.config.ts
import shared from '@fi-workers/lint/oxfmt';
import { defineConfig } from 'oxfmt';

export default defineConfig({ ...shared, ignorePatterns: ['pnpm-lock.yaml'] });
```

### knip

```ts
// knip.config.ts
import shared from '@fi-workers/lint/knip';
import type { KnipConfiguration } from 'knip';

const config: KnipConfiguration = { ...shared };
export default config;
```

### ast-grep

```yaml
# sgconfig.yml
ruleDirs:
  - node_modules/@fi-workers/lint/ast-grep/rules
  - rules # 레포 고유 규칙
languageGlobs:
  tsx: ['*.ts', '*.mts', '*.cts'] # 규칙은 tsx 문법으로 작성되어 있음
```

규칙 id가 레포 고유 규칙과 겹치면 ast-grep이 오류를 냅니다. 같은 규칙이 레포에 있으면 레포 쪽을 지웁니다.

### CI 게이트

```sh
oxfmt --check .
oxlint            # typeAware + typeCheck + denyWarnings (루트 설정)
knip
ast-grep scan
```

React 레포는 [react-doctor 작업](./docs/react-doctor.md)을 더합니다.

## 기존 레포를 옮기는 순서 (TypeScript 7 전환)

1. **TypeScript 7로 올립니다.** `typescript@7.0.x`를 설치하고 tsconfig에서 `baseUrl`을 없앱니다. 공용 tsconfig 베이스를 `extends`합니다.
2. **TS API가 필요한 도구를 정리합니다.** TS 7에는 예전 프로그래매틱 API가 없습니다. typescript-eslint, ts-jest, ts-morph, 일부 코드 생성기처럼 `typescript` 패키지를 import하는 도구는 대체 도구로 바꾸거나(예: ts-jest → Vitest), 그 도구만 쓰도록 `typescript@6`을 별칭으로 따로 설치합니다(`"typescript-6": "npm:typescript@6.0.x"`). 타입 검사와 린트는 TS 7로만 합니다.
3. **ESLint와 Prettier를 지웁니다.** `eslint*`, `@typescript-eslint/*`, `prettier*` 패키지와 설정 파일, 에디터 설정을 지우고 이 패키지의 Oxlint·Oxfmt 설정으로 바꿉니다. 첫 포맷은 커밋을 따로 나눕니다.
4. **Next.js는 빌드 타입 검사를 끕니다.** CI의 Oxlint `typeCheck`가 타입을 검사하므로 `next.config.ts`에 `typescript: { ignoreBuildErrors: true }`를 둡니다. CI에서 Oxlint를 빼면 타입 검사도 사라진다는 뜻이니 게이트에서 빼지 않습니다.
5. **위반을 고칩니다.** `oxlint --fix`로 기계적인 것부터 고칩니다. 양이 많은 규칙은 레포 루트 설정에서 좁은 범위(`overrides`의 `files`)로 끄고, 이유 주석과 추적 이슈를 남긴 뒤 나눠서 갚습니다.
6. **CI를 바꿉니다.** 위 게이트를 넣고, `tsc --noEmit` 단계는 지웁니다.

## 이 레포 개발

```sh
pnpm install
pnpm verify   # 포맷, 자체 린트, knip, ast-grep 규칙·테스트, 프리셋 fixture 테스트
```

`fixtures/*-pass`는 오류가 하나도 없어야 하고, `fixtures/*-fail`은 `test/presets.test.ts`에 적힌 규칙을 모두 보고해야 합니다. 규칙을 바꾸면 fixture도 같이 고칩니다.

배포: `package.json`의 `version`을 올리는 PR을 머지한 뒤 `vX.Y.Z` 태그를 push하면 `Publish` 워크플로가 GitHub Packages에 올립니다.

## 라이선스

MIT
