import customtkinter as ct
import tkinter as tk
from frames.cadastro_frame import CadastroFrame
from frames.consulta_frame import ConsultaFrame
from frames.agenda_frame import AgendaFrame


class App(ct.CTk):
    def __init__(self):
        super().__init__()
        
        self.title("Banco de Dados - Loja MF")
        self.geometry("1280x720")

        # Barra de menu
        self.menu_bar = tk.Menu(self)
        self.config(menu=self.menu_bar)
        
        # Menu de Formulário
        self.form_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.form_menu.add_command(label="Cadastrar", command=self.show_cadastro_frame)
        self.form_menu.add_command(label="Consultar", command=self.show_consulta_frame)
        self.form_menu.add_command(label="Agenda", command=self.show_agenda_frame)
        self.menu_bar.add_cascade(label="Formulário", menu=self.form_menu)

        # Frame principal
        self.current_frame = None
        self.show_cadastro_frame()
        # Frame formulários
        self.forms_frame = None

    def clear_current_frame(self):
        if self.current_frame:
            self.current_frame.pack_forget()
            self.current_frame.destroy()

    def show_cadastro_frame(self):
        self.clear_current_frame()
        self.current_frame = CadastroFrame(self)
        self.current_frame.pack(fill="both", expand=True)

    def show_consulta_frame(self):
        self.clear_current_frame()
        self.current_frame = ConsultaFrame(self)
        self.current_frame.pack(fill="both", expand=True)
        

    def show_agenda_frame(self):
        self.clear_current_frame()
        self.current_frame = AgendaFrame(self)
        self.current_frame.pack(fill="both", expand=True)


if __name__ == "__main__":
    app = App()
    app.mainloop()
