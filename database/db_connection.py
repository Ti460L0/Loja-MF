import psycopg2

def connect_db():
    try:
        conn = psycopg2.connect(
            host="192.168.1.36",
            database="loja_MF",
            user="postgres",
            password="milla1207",
            options="-c client_encoding=UTF8"
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None
