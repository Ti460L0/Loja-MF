import customtkinter as ct

class MenuFrame(ct.CTkFrame):
    def __init__(self, master, controller):
        super().__init__(master)
        self.controller = controller
        self.create_form()
        
    def create_form(self):

        self.button1 = ct.CTkButton(self, text="Cadastrar")
        self.button1.grid(row=0, column=0, padx=10, pady=10)
        self.button2 = ct.CTkButton(self, text="Consultar")
        self.button2.grid(row=0, column=1, padx=10, pady=10)
        self.button3 = ct.CTkButton(self, text="Agenda")
        self.button3.grid(row=0, column=2, padx=10, pady=10)
