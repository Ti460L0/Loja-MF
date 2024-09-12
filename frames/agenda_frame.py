import customtkinter as ct

class AgendaFrame(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.create_form()

    def create_form(self):
        self.label = ct.CTkLabel(self, text="Agenda")
        self.label.grid(row=0, column=0, padx=10, pady=10)
        self.pack(fill="both", expand=True)

