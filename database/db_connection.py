import psycopg2

def connect_db():
    try:
        conn = psycopg2.connect(
            host="postgreslojamf.cjoou8goivt4.us-east-2.rds.amazonaws.com",
            database="loja_MF",
            user="postgres",
            password="milla1207",
            options="-c client_encoding=UTF8"
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None
