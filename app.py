import customtkinter as ct
import tkinter as tk
from frames.cadrastro_frame import CadastroFrame
from frames.consulta_frame import ConsultaFrame
from frames.agenda_frame import AgendaFrame

class App(ct.CTk):
    def_init_(self):
    super().__init__()
    
    self.title('Banco de dados - Loja MF')
    self.geometry('1280x720')

    self.menu_bar = tk.Menu(self)
    self.config(menu=self.menu_bar)

    #Barra de formularios
    self.form_menu = tk.Menu(self.menu_bar, tearoff=0)
    self.form_menu.add_command(label="Cadastrar", command=lambda: self.show_form("cadastro"))
    self.form_menu.add_command(label="Consultar", command=lambda: self.show_form("consulta"))
    self.form_menu.add_command(label="Agenda", command=lambda: self.show_form("agenda"))
    self.menu_bar.add_cascade(label="Formulário", menu=self.form_menu)

    #Barra de menu
    self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
    self.file_menu.add_command(label="Sobre", command=lambda: self.show_form("sobre"))
    self.file_menu.add_command(label="Sair", command=self.destroy)
    self.menu_bar.add_cascade(label="Menu", menu=self.file_menu)

    #Frame principal