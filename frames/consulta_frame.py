import customtkinter as ct
from database.db_connection import connet_db

class ConsultaFrame(ct.CTkFrame):
    def _init_(self, master):
        super()._init_(master)
        self.create_form()

def create_form(self):