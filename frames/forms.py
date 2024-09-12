import customtkinter as ct

class forms(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()
        
    def create_form(self):

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