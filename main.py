import customtkinter as ct
import tkinter as tk
from tkinter import messagebox
import psycopg2

# Função para conectar ao banco de dados PostgreSQL
def connect_db():
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

# Classe principal do aplicativo
class App(ct.CTk):
    def __init__(self):
        super().__init__()

        # Barra de menu
        self.menu_bar = tk.Menu(self)
        self.config(menu=self.menu_bar)

        # Menu de Arquivo
        self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.file_menu.add_command(label="Exit", command=self.destroy)
        self.menu_bar.add_cascade(label="File", menu=self.file_menu)

        # Menu de Formulário
        self.form_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.form_menu.add_command(label="Cadastrar", command=lambda: self.show_form("cadastro"))
        self.form_menu.add_command(label="Consultar", command=lambda: self.show_form("consulta"))
        self.form_menu.add_command(label="Agenda", command=lambda: self.show_form("agenda"))
        self.menu_bar.add_cascade(label="Formulário", menu=self.form_menu)

        # Menu Sobre
        self.about_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.about_menu.add_command(label="Sobre", command=lambda: self.show_form("sobre"))
        self.menu_bar.add_cascade(label="Sobre", menu=self.about_menu)

        # Configurações da janela
        self.title("Form Example")
        self.geometry("1000x600")

        # Frame principal
        self.form_frame = ct.CTkFrame(self, corner_radius=10, fg_color="blue")
        self.form_frame.pack(side="top", padx=5, pady=5, fill="both")

        # Botões principais
        self.cad_button = ct.CTkButton(self.form_frame, text="Cadastrar", command=lambda: self.show_form("cadastro"))
        self.cad_button.pack(side="left", padx=5, pady=5)

        self.con_button = ct.CTkButton(self.form_frame, text="Consultar", command=lambda: self.show_form("consulta"))
        self.con_button.pack(side="left", padx=5, pady=5)

        self.agenda_button = ct.CTkButton(self.form_frame, text="Agenda", command=lambda: self.show_form("agenda"))
        self.agenda_button.pack(side="left", padx=5, pady=5)

        # Formulário de Cadastro
        self.form_cadastro = ct.CTkFrame(self, corner_radius=10, fg_color="red")
        self.form_cadastro.pack(pady=20, padx=20, fill="both", expand=True)

        # Função de validação
        validate_cmd = self.register(self.validate_entry)

        # Nome
        self.name_label = ct.CTkLabel(self.form_cadastro, text="Nome:")
        self.name_label.pack()
        self.name_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.name_entry.pack()

        # RG (Apenas números, máximo 9 caracteres)
        self.rg_label = ct.CTkLabel(self.form_cadastro, text="RG:")
        self.rg_label.pack()
        self.rg_entry = ct.CTkEntry(self.form_cadastro, width=200, validate="key", validatecommand=(validate_cmd, '%P', '9'))
        self.rg_entry.pack()

        # CPF (Apenas números, máximo 11 caracteres)
        self.cpf_label = ct.CTkLabel(self.form_cadastro, text="CPF:")
        self.cpf_label.pack()
        self.cpf_entry = ct.CTkEntry(self.form_cadastro, width=200, validate="key", validatecommand=(validate_cmd, '%P', '11'))
        self.cpf_entry.pack()

        # E-mail
        self.email_label = ct.CTkLabel(self.form_cadastro, text="E-mail:")
        self.email_label.pack()
        self.email_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.email_entry.pack()

        # Telefone
        self.telefone_label = ct.CTkLabel(self.form_cadastro, text="Telefone:")
        self.telefone_label.pack()
        self.telefone_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.telefone_entry.pack()

        # Endereço
        self.endereco_label = ct.CTkLabel(self.form_cadastro, text="Endereço:")
        self.endereco_label.pack()
        self.endereco_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.endereco_entry.pack()

        # CEP
        self.cep_label = ct.CTkLabel(self.form_cadastro, text="CEP:")
        self.cep_label.pack()
        self.cep_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.cep_entry.pack()

        # Bairro
        self.bairro_label = ct.CTkLabel(self.form_cadastro, text="Bairro:")
        self.bairro_label.pack()
        self.bairro_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.bairro_entry.pack()

        # Botões de Enviar e Sair
        self.submit_button = ct.CTkButton(self.form_cadastro, text="Submit", command=lambda: self.submit_form())
        self.submit_button.pack(pady=10)
        self.exit_button = ct.CTkButton(self.form_cadastro, text="Sair", command=lambda: self.destroy())
        self.exit_button.pack(pady=10)

        # Esconde o formulário inicialmente
        self.form_cadastro.pack_forget()

    # Função para validar o campo RG e CPF
    def validate_entry(self, input_value, max_length):
        # Verifica se o valor é numérico e se não excede o limite de caracteres
        if input_value.isdigit() and len(input_value) <= int(max_length):
            return True
        elif input_value == "":  # Permite apagar (deixar o campo vazio)
            return True
        else:
            return False

    # Função para mostrar o formulário
    def show_form(self, form_name):
        if form_name == "cadastro":
            self.form_cadastro.pack()
        else:
            self.form_cadastro.pack_forget()

    # Função para enviar o formulário
    def submit_form(self):
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        try:
            cursor = conn.cursor()

            # Pegando os valores dos campos
            nome = self.name_entry.get()
            rg = self.rg_entry.get()
            cpf = self.cpf_entry.get()
            email = self.email_entry.get()
            telefone = self.telefone_entry.get()
            endereco = self.endereco_entry.get()
            cep = self.cep_entry.get()
            bairro = self.bairro_entry.get()

            # Inserindo os dados no banco de dados
            query = """
                INSERT INTO clientes (nome, rg, cpf, email, telefone, endereco, cep, bairro)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (nome, rg, cpf, email, telefone, endereco, cep, bairro))
            conn.commit()

            messagebox.showinfo("Sucesso", "Cadastro realizado com sucesso!")

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao cadastrar: {e}")
        finally:
            cursor.close()
            conn.close()

# Inicializa o aplicativo
if __name__ == "__main__":
    app = App()
    app.mainloop()
