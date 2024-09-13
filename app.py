import customtkinter as ct
import tkinter as tk
from cliente_frames.cadastro_cliente import CadastroCliente
from PIL import Image

class App(ct.CTk):
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
        self.geometry(f"1400x700+{x}+{y}")

        # Conf da barra de janela
        self.overrideredirect(True)

        ######### Frame Superior (top_frame) #########
        top_frame = ct.CTkFrame(self, height=40)
        top_frame.place(relx=0, rely=0, anchor='nw', relwidth=1, relheight=0.05)

        # Botoes da barra superior 
        self.close_button = ct.CTkButton(top_frame, text="❌", fg_color="transparent", hover_color="red", width=40, font=("Arial", 15), command=self.destroy)
        self.close_button.pack(side="right", padx=10)
        
        self.minimize_button = ct.CTkButton(top_frame, text="➖", fg_color="transparent", hover_color="dimgrey", width=40, font=("Arial", 15), command=self.iconify)
        self.minimize_button.pack(side="right")

        ######### Frame Principal (main_frame) #########
        main_frame = ct.CTkFrame(self)
        main_frame.place(relx=1, rely=0.05, anchor='ne', relwidth=0.745, relheight=0.95)

        # Adicionando o frame de cadastro de cliente
        # CadastroCliente(master=main_frame).pack(fill="both", expand=True)

        ######### MENU LATERAL ##########
        menu_frame = ct.CTkFrame(self, width=100)
        menu_frame.place(relx=0, rely=0.05, anchor='nw', relwidth=0.25, relheight=0.95)

        # logo
        self.logo_frame = ct.CTkFrame(menu_frame, bg_color="transparent", fg_color="transparent")
        self.logo_frame.place(relx=0.5, rely=0, anchor='n', x=0, y=0)
        self.logo = ct.CTkImage(Image.open("logo.png"), size=(150, 150))
        self.logo_label = ct.CTkLabel(menu_frame, image=self.logo)
        self.logo_label.place(relx=0.5, rely=0, anchor='n', x=0, y=20)

        # Campo de pesquisa
        self.search_frame = ct.CTkFrame(menu_frame, bg_color="transparent", fg_color="transparent")
        self.search_frame.place(relx=0.5, rely=0.95, anchor='s', x=0, y=0)

        self.search_label = ct.CTkLabel(self.search_frame, text="Pesquisar:", font=("Arial", 14))
        self.search_label.pack(side="top", pady=10, padx=10)
        
        self.search_input = ct.CTkEntry(self.search_frame, width=200)
        self.search_input.pack(side="left", pady=10, padx=10)
        
        self.search_button = ct.CTkButton(self.search_frame, width=40, text="🔎", font=("Arial", 14))
        self.search_button.pack(side="right", pady=10, padx=10)

        self.bind("<Return>", lambda event: search_function())

        def search_function():
            print("Pesquisando...")

        # Menu de opções    
        self.options_frame = ct.CTkFrame(menu_frame, height=40, bg_color="transparent", fg_color="transparent")
        self.options_frame.place(relx=0.5, rely=0.5, anchor='s', x=0, y=0)

        self.options_label = ct.CTkLabel(self.options_frame, text="Clientes:", font=("Arial", 14))
        self.options_label.pack(side="top", pady=10, padx=10)

        self.options_button = ct.CTkButton(self.options_frame, width=40, text="  Cadastrar", font=("Arial", 14), command=lambda: create_window())
        self.options_button.pack(side="left", pady=10, padx=10)

        def create_window():
            window = tk.Toplevel()
            window.title("Cadastrar")
            screen_width = self.winfo_screenwidth()
            screen_height = self.winfo_screenheight()
            x = int((screen_width / 2) - (1400 / 2))
            y = int((screen_height / 2) - (780 / 2))
            window.geometry(f"800x400+{x}+{y}")
            window.overrideredirect(True)
            CadastroCliente(window).pack(fill="both", expand=True)



if __name__ == "__main__":
    app = App()
    app.mainloop()
