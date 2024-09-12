import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class CadastroFrame(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()

    def create_form(self):
        validate_cmd = self.register(self.validate_entry)

         # Nome
        self.name_label = ct.CTkLabel(self.form_cadastro, text="Nome:")
        self.name_label.grid(row=0, column=0, pady=10)
        self.name_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.name_entry.grid(row=0, column=1, pady=10)
        
        # RG
        self.rg_label = ct.CTkLabel(self.form_cadastro, text="RG:")
        self.rg_label.grid(row=1, column=0, padx=10, pady=10)
        self.rg_entry = ct.CTkEntry(self.form_cadastro, width=200, validate="key", validatecommand=(validate_cmd, '%P', '9'))
        self.rg_entry.grid(row=1, column=1, padx=10, pady=10)
        
        # CPF
        self.cpf_label = ct.CTkLabel(self.form_cadastro, text="CPF:")
        self.cpf_label.grid(row=1, column=2, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self.form_cadastro, width=200, validate="key", validatecommand=(validate_cmd, '%P', '11'))
        self.cpf_entry.grid(row=1, column=3, padx=10, pady=10)
        
        # E-mail
        self.email_label = ct.CTkLabel(self.form_cadastro, text="E-mail:")
        self.email_label.grid(row=3, column=0, padx=10, pady=10)
        self.email_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.email_entry.grid(row=3, column=1, padx=10, pady=10)
        
        # Telefone
        self.telefone_label = ct.CTkLabel(self.form_cadastro, text="Telefone:")
        self.telefone_label.grid(row=4, column=0, padx=10, pady=10)
        self.telefone_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.telefone_entry.grid(row=4, column=1, padx=10, pady=10)
        
        # Endereço
        self.endereco_label = ct.CTkLabel(self.form_cadastro, text="Endereço:")
        self.endereco_label.grid(row=5, column=0, padx=10, pady=10)
        self.endereco_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.endereco_entry.grid(row=5, column=1, padx=10, pady=10)
        
        # CEP
        self.cep_label = ct.CTkLabel(self.form_cadastro, text="CEP:")
        self.cep_label.grid(row=6, column=0, padx=10, pady=10)
        self.cep_entry = ct.CTkEntry(self.form_cadastro, width=200, validate="key", validatecommand=(validate_cmd, '%P', '8'))
        self.cep_entry.grid(row=6, column=1, padx=10, pady=10)
        
        # Bairro
        self.bairro_label = ct.CTkLabel(self.form_cadastro, text="Bairro:")
        self.bairro_label.grid(row=7, column=0, padx=10, pady=10)
        self.bairro_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.bairro_entry.grid(row=7, column=1, padx=10, pady=10)
        # Botão de Envio
        self.submit_button = ct.CTkButton(self, text="Submit", command=self.submit_form)
        self.submit_button.grid(row=8, column=0, padx=10, pady=10)

    def validate_entry(self, input_value, max_length):
        return input_value.isdigit() and len(input_value) <= int(max_length)

    def submit_form(self):
        name = self.name_entry.get()
        cpf = self.cpf_entry.get()
        
        if not name or not cpf:
            messagebox.showwarning("Aviso", "Todos os campos devem ser preenchidos.")
            return
        
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        try:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO clientes (nome, cpf) VALUES (%s, %s)", (name, cpf))
            conn.commit()
            messagebox.showinfo("Sucesso", "Cadastro realizado com sucesso!")
        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao salvar dados: {e}")
        finally:
            cursor.close()
            conn.close()
