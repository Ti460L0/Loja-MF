import boto3
import customtkinter as ct
from tkinter import filedialog, Tk

def upload_image_to_s3():
    # Configurar cliente do boto3
    s3 = boto3.client(
        's3',
        aws_access_key_id='',
        aws_secret_access_key='',
        region_name='us-east-2' 
    )
    
    # Abrir um seletor de arquivos para escolher a imagem
    root = Tk()
    root.withdraw()  # Esconde a janela principal
    file_path = filedialog.askopenfilename()

    # Upload do arquivo para o bucket S3
    bucket_name = 'bucked-lojamf'
    s3_key = file_path.split('fotos/')[-1]  # Nome do arquivo a ser usado no S3
    
    try:
        s3.upload_file(file_path, bucket_name, s3_key)
        print(f"Arquivo {s3_key} enviado com sucesso.")
    except Exception as e:
        print(f"Erro ao enviar arquivo: {e}")

# Exemplo de uso com um botão no CustomTkinter
#upload_button = ctk.CTkButton(app, text="Upload Imagem", command=upload_image_to_s3)
#upload_button.pack(pady=20)
