import customtkinter as ct

def connet_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="loja_MF",
            user="postgres",
            password="milla1207",
            options="-c client_encoding=UTF8"
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None