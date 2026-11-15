type Shape = 'circle' | 'square';

// A switch over a union names every member and has no default.
export function corners(shape: Shape): number {
  switch (shape) {
    case 'circle': {
      return 0;
    }
    case 'square': {
      return 4;
    }
  }
}

// Any other switch keeps a default.
export function label(code: number): string {
  switch (code) {
    case 200: {
      return 'ok';
    }
    default: {
      return 'error';
    }
  }
}
