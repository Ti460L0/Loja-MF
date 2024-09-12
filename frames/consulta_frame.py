import customtkinter as ct
from database.db_connection import connect_db
from frames.forms import forms



class ConsultaFrame(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()
        self.create_forms_frame()
        self.main_frame = None
        self.menu_frame = None
        self.form_frame = None
        
    

    def create_form(self):

        # Campos de consulta 

        self.consulta_label = ct.CTkLabel(self, text="Consultar:")

        self.consulta_label = ct.CTkLabel(self, text="Nome: ")
        self.consulta_label.grid(row=0, column=10, padx=10, pady=10)
        self.consulta_nome = ct.CTkEntry(self, width=200)
        self.consulta_nome.grid(row=0, column=11, padx=10, pady=20)

        self.consulta_label = ct.CTkLabel(self, text="CPF:")
        self.consulta_label.grid(row=1, column=10, padx=10, pady=10)
        self.consulta_cpf = ct.CTkEntry(self, width=200)
        self.consulta_cpf.grid(row=1, column=11, padx=10, pady=20)

        self.consulta_nome.bind("<Return>", lambda event: self.auto_fill_form('nome'))
        self.consulta_cpf.bind("<Return>", lambda event: self.auto_fill_form('cpf'))

        self.button_clear = ct.CTkButton(self, text="Limpar", command=self.clear_form)
        self.button_clear.grid(row=0, column=4, padx=10, pady=10)

    def create_forms_frame(self):
        
        # Nome
        self.name_label = ct.CTkLabel(self, text="Nome:")
        self.name_label.grid(row=0, column=0, pady=10)
        self.name_entry = ct.CTkEntry(self, width=200)
        self.name_entry.grid(row=0, column=1, pady=10)
        
        # RG
        self.rg_label = ct.CTkLabel(self, text="RG:")
        self.rg_label.grid(row=1, column=0, padx=10, pady=10)
        self.rg_entry = ct.CTkEntry(self, width=200, validate="key")
        self.rg_entry.grid(row=1, column=1, padx=10, pady=10)
        
        # CPF
        self.cpf_label = ct.CTkLabel(self, text="CPF:")
        self.cpf_label.grid(row=1, column=2, padx=10, pady=10)
        self.cpf_entry = ct.CTkEntry(self, width=200, validate="key")
        self.cpf_entry.grid(row=1, column=3, padx=10, pady=10)
        
        # E-mail
        self.email_label = ct.CTkLabel(self, text="E-mail:")
        self.email_label.grid(row=3, column=0, padx=10, pady=10)
        self.email_entry = ct.CTkEntry(self, width=200)
        self.email_entry.grid(row=3, column=1, padx=10, pady=10)
        
        # Telefone
        self.telefone_label = ct.CTkLabel(self, text="Telefone:")
        self.telefone_label.grid(row=4, column=0, padx=10, pady=10)
        self.telefone_entry = ct.CTkEntry(self, width=200)
        self.telefone_entry.grid(row=4, column=1, padx=10, pady=10)
        
        # Endereço
        self.endereco_label = ct.CTkLabel(self, text="Endereço:")
        self.endereco_label.grid(row=5, column=0, padx=10, pady=10)
        self.endereco_entry = ct.CTkEntry(self, width=200)
        self.endereco_entry.grid(row=5, column=1, padx=10, pady=10)
        
        # CEP
        self.cep_label = ct.CTkLabel(self, text="CEP:")
        self.cep_label.grid(row=6, column=0, padx=10, pady=10)
        self.cep_entry = ct.CTkEntry(self, width=200, validate="key")
        self.cep_entry.grid(row=6, column=1, padx=10, pady=10)
        
        # Bairro
        self.bairro_label = ct.CTkLabel(self, text="Bairro:")
        self.bairro_label.grid(row=7, column=0, padx=10, pady=10)
        self.bairro_entry = ct.CTkEntry(self, width=200)
        self.bairro_entry.grid(row=7, column=1, padx=10, pady=10)

    def clear_form(self):
        self.consulta_nome.delete(0, "end")
        self.consulta_cpf.delete(0, "end")
        self.name_entry.delete(0, "end")
        self.rg_entry.delete(0, "end")
        self.cpf_entry.delete(0, "end")
        self.email_entry.delete(0, "end")
        self.telefone_entry.delete(0, "end")
        self.endereco_entry.delete(0, "end")
        self.cep_entry.delete(0, "end")
        self.bairro_entry.delete(0, "end")


    def auto_fill_form(self, field):
        conn = connect_db()

        if conn:
            cursor = conn.cursor()

            # Captura os valores dos campos de entrada
            nome = self.consulta_nome.get()
            cpf = self.consulta_cpf.get()

            # Executa a consulta com base no campo CPF ou Nome
            if field == 'cpf' and cpf:
                query = "SELECT nome, rg, cpf, email, telefone, endereco, cep, bairro FROM clientes WHERE cpf = %s"
                cursor.execute(query, (cpf,))
            elif field == 'nome' and nome:
                query = "SELECT nome, rg, cpf, email, telefone, endereco, cep, bairro FROM clientes WHERE nome ILIKE %s"
                cursor.execute(query, (f"%{nome}%",))
            else:
                return

            result = cursor.fetchone()

            # Se encontrar resultado, preenche os campos
            if result:
                self.name_entry.delete(0, "end")
                self.name_entry.insert(0, result[0])

                self.rg_entry.delete(0, "end")
                self.rg_entry.insert(0, result[1])

                self.cpf_entry.delete(0, "end")
                self.cpf_entry.insert(0, result[2])

                self.email_entry.delete(0, "end")
                self.email_entry.insert(0, result[3])

                self.telefone_entry.delete(0, "end")
                self.telefone_entry.insert(0, result[4])

                self.endereco_entry.delete(0, "end")
                self.endereco_entry.insert(0, result[5])

                self.cep_entry.delete(0, "end")
                self.cep_entry.insert(0, result[6])

                self.bairro_entry.delete(0, "end")
                self.bairro_entry.insert(0, result[7])

            cursor.close()
            conn.close()

