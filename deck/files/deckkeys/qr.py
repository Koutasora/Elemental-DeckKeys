"""QR codes with the address of this Deck. Only the address, never a pairing code."""

from functools import lru_cache

from .qrcodegen import QrCode


def _matrix(text):
    code = QrCode.encode_text(text, QrCode.Ecc.MEDIUM)
    size = code.get_size()
    return [[code.get_module(x, y) for x in range(size)] for y in range(size)]


@lru_cache(maxsize=8)
def svg(text, border=4):
    rows = _matrix(text)
    path = "".join(f"M{x + border},{y + border}h1v1h-1z"
                   for y, row in enumerate(rows) for x, dark in enumerate(row) if dark)
    dim = len(rows) + 2 * border
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {dim} {dim}" '
            f'shape-rendering="crispEdges"><rect width="{dim}" height="{dim}" fill="#fff"/>'
            f'<path d="{path}" fill="#000"/></svg>')


def terminal(text, border=2):
    """Black on white with half blocks (two module rows per line), for Konsole."""
    rows = _matrix(text)
    size = len(rows) + 2 * border

    def dark(x, y):
        x, y = x - border, y - border
        return 0 <= y < len(rows) and 0 <= x < len(rows) and rows[y][x]

    lines = []
    for y in range(0, size, 2):
        line = []
        for x in range(size):
            top = 30 if dark(x, y) else 37
            if y + 1 >= size:
                bottom = 49  # past the last row: terminal background
            else:
                bottom = 40 if dark(x, y + 1) else 47
            line.append(f"\033[{top};{bottom}m▀")
        lines.append("".join(line) + "\033[0m")
    return "\n".join(lines)
