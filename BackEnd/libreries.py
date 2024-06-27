import subprocess
import sys

# Lista de paquetes requeridos
paquetes_requeridos = [
    'Flask',
    'Flask-Bcrypt',
    'Flask-CORS',
    'Flask-JWT-Extended',
    'mysql-connector-python'
]

# Función para instalar paquetes
def instalar_paquetes(paquetes):
    for paquete in paquetes:
        try:
            __import__(paquete.replace('-', '_'))
            print(f"{paquete} ya está instalado.")
        except ImportError:
            print(f"Instalando {paquete}...")
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', paquete])

if __name__ == '__main__':
    instalar_paquetes(paquetes_requeridos)