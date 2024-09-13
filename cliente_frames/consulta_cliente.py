import customtkinter as ct
from tkinter import messagebox
from ..database.db_connection import connect_db

class ConsultaCliente(ct.CTk):
    def __init__(self):
        super().__init__()

        self.title("Loja-MF")

        # APAGAR ANTES DA VERSÃO FINAL
        self.bind("<Escape>", lambda event: self.destroy())

        # Iniciar centralizado
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        x = int((screen_width / 2) - (1400 / 2))
        y = int((screen_height / 2) - (780 / 2))
        self.geometry(f"800x400+{x}+{y}")

        # Conf da barra de janela
        self.overrideredirect(True)
        validate_cmd = self.register(self.validate_entry)

        # Frame das entradas
        self.entradas_frame = ct.CTkFrame(self)
        self.entradas_frame.place(relx=0.5, rely=0.5, anchor='center')

        # Nome 
        
        
        # CPF

if __name__ == "__main__":
    app = ConsultaCliente()
    app.mainloop()