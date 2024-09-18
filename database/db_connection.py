import psycopg2
from dotenv import load_dotenv
import os

#carregando o arquivo .env
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)
load_dotenv()

#definindo as variáveis de ambiente

PG_HOST = os.getenv("PG_HOST")
PG_DB = os.getenv("PG_DB")
PG_USER = os.getenv("PG_USER")
PG_PASSWORD = os.getenv("PG_PASSWORD")
PG_OPTION = os.getenv("PG_OPTION")


def connect_db():
    try:
        conn = psycopg2.connect(
            host=PG_HOST,
            database=PG_DB,
            user=PG_USER,
            password=PG_PASSWORD,
            options=PG_OPTION
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None


