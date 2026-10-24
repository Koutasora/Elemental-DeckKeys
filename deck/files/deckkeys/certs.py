"""Self-signed HTTPS certificate issued by the Deck itself."""

import hashlib
import os
import socket
import ssl
import subprocess


def ensure_certificate(data_dir):
    cert = os.path.join(data_dir, "cert.pem")
    key = os.path.join(data_dir, "key.pem")
    if not (os.path.exists(cert) and os.path.exists(key)):
        host = socket.gethostname()
        subprocess.run([
            "openssl", "req", "-x509", "-newkey", "ec",
            "-pkeyopt", "ec_paramgen_curve:prime256v1", "-nodes",
            "-keyout", key, "-out", cert, "-days", "3650",
            "-subj", "/CN=Elemental DeckKeys",
            "-addext", f"subjectAltName=DNS:{host}.local,DNS:{host},DNS:localhost,IP:127.0.0.1",
        ], check=True, capture_output=True)
        os.chmod(key, 0o600)
    return cert, key


def fingerprint(cert_path):
    """First 8 bytes of the SHA-256 fingerprint, as browsers show it."""
    with open(cert_path, encoding="ascii") as f:
        der = ssl.PEM_cert_to_DER_cert(f.read())
    digest = hashlib.sha256(der).hexdigest().upper()
    return " ".join(digest[i:i + 2] for i in range(0, 16, 2))


def server_context(cert, key):
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.minimum_version = ssl.TLSVersion.TLSv1_2
    context.load_cert_chain(cert, key)
    return context
