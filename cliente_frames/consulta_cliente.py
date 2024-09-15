import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db


class ConsultaCliente(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
       
        # Main Frame
        self.main_frame = ct.CTkFrame(self.master, border_color="darkgoldenrod", border_width=5, corner_radius=10)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)


        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=10)
        self.title_frame.place(relx=0.5, rely=0.5, anchor="center")


        # Barra de pesquisa
        self.search_bar = ct.CTkEntry(self.title_frame, placeholder_text="Pesquisar")
        self.search_bar.place(relx=0.5, rely=0.5, anchor="center", relwidth=0.6, relheight=0.7)

        