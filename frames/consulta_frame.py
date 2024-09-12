import customtkinter as ct
from database.db_connection import connet_db

class ConsultaFrame(ct.CTkFrame):
    def _init_(self, master):
        super()._init_(master)
        self.create_form()

    def create_form(self):
        self.form_consulta_menu = ct.CTkFrame(self, corner_radius=10)
    
        # Campos de consulta 

        self.consulta_label = ct.CTkLabel(self.form_consulta_menu, text="Consultar:")
        self.consulta_label.grid(row=0, column=0, padx=2)

        self.consulta_label = ct.CTkLabel(self.form_consulta_menu, text="Nome: ")
        self.consulta_label.grid(row=1, column=1, padx=10, pady=10)
        self.consulta_nome = ct.CTkEntry(self.form_consulta_menu, width=200)
        self.consulta_nome.grid(row=1, column=2, padx=10, pady=20)

        self.consulta_label = ct.CTkLabel(self.form_consulta_menu, text="CPF:")
        self.consulta_label.grid(row=1, column=3, padx=10, pady=10)
        self.consulta_cpf = ct.CTkEntry(self.form_consulta_menu, width=200)
        self.consulta_cpf.grid(row=1, column=4, padx=10, pady=20)

        self.consulta_nome.bind("<Return>", lambda event: self.auto_fill_form('nome'))
        self.consulta_cpf.bind("<Return>", lambda event: self.auto_fill_form('cpf'))

        self.button_clear = ct.CTkButton(self.form_consulta_menu, text="Limpar", command=self.clear_form)
        self.button_clear.grid(row=1, column=5, padx=10, pady=10)