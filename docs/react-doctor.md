# react-doctor CI 작업 (React 레포용)

[react-doctor](https://github.com/millionco/react-doctor)는 React 코드의 상태 관리·effect·성능·접근성 문제를 진단하는 CLI입니다.

**이 패키지에는 넣지 않습니다.** react-doctor의 라이선스는 OSI 승인 라이선스가 아닌 수정 MIT라서, 이 공개 패키지가 의존성으로 묶거나 재배포하지 않습니다. 쓰려는 레포가 CI에서 정확한 버전을 직접 실행합니다. 쓰기 전에 그 레포의 쓰임새가 라이선스 조건에 맞는지 확인하세요.

## 원칙

- 버전을 고정하고 `pnpm dlx`로 실행합니다: `pnpm dlx react-doctor@0.9.23`. `package.json`에 `devEngines.packageManager`로 pnpm을 지정한 레포에서는 `npx`가 실행을 거부합니다.
- 외부 전송을 끕니다: `--no-score`(점수 API, 공유 URL, 크래시 리포트를 끔)와 `--no-supply-chain`(외부 의존성 검사를 끔).
- 점수는 게이트로 쓰지 않습니다. 게이트는 "새 이슈 0건"입니다.
- 도입은 두 단계로 합니다.
  1. **기준선 기간.** `--blocking none`으로 돌려 결과만 남깁니다. 기존 이슈는 `main`에서 만든 JSON 보고서(baseline)에 묶어 둡니다.
  2. **게이트.** 몇 주 뒤 `--blocking error`로 올립니다. baseline에 없는 새 이슈가 생기면 CI가 실패합니다.

## 기준선 만들기

```sh
pnpm dlx react-doctor@0.9.23 <앱 폴더> --no-score --no-supply-chain --yes \
  --json --json-out .react-doctor/baseline.json
```

보고서에는 실행한 컴퓨터의 절대 경로가 들어가므로 레포 루트 기준 상대 경로로 바꾼 뒤(`sed -i '' "s#$PWD/##g" .react-doctor/baseline.json`) 커밋합니다. 기존 이슈를 고치면 같은 명령으로 다시 만듭니다.

## GitHub Actions 예시

```yaml
react-doctor:
  runs-on: ubuntu-latest
  permissions:
    contents: read
  steps:
    - uses: actions/checkout@<sha> # fetch-depth: 0 이면 --scope changed 도 쓸 수 있음
    - uses: pnpm/action-setup@<sha>
    - uses: actions/setup-node@<sha>
      with:
        node-version-file: .nvmrc
    # 기준선 기간: --blocking none. 게이트로 올릴 때 error 로 바꿉니다.
    - run: >
        pnpm dlx react-doctor@0.9.23 <앱 폴더>
        --no-score --no-supply-chain --yes
        --baseline .react-doctor/baseline.json
        --blocking none
```

react-doctor는 자체 Oxlint와 TypeScript 버전을 따로 들고 오므로 레포의 툴체인과 섞이지 않습니다. 의존성 설치(`pnpm install`) 없이 `pnpm dlx`로 격리해서 실행합니다.
