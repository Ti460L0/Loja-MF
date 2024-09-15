import customtkinter as ct
import tkinter as tk

from screens.cadastro_cliente import CadastroCliente
from screens.cadastro_produto import CadastroProduto

from screens.consulta_cliente import ConsultaCliente
from screens.lista_produtos import ListaProdutos
from screens.agendar_produto import Agendar
from screens.object_details import ObjectDetails

from PIL import Image



class App(ct.CTk):
    def __init__(self):
        super().__init__()

        self.after(100, lambda: self.state("zoomed") if self.winfo_exists() else None)
        
        self.title("Loja-MF")   

        # Conf da janela
        # self.configure(borderwidth=5, border_color="darkgoldenrod")
        # self.configure(bg_color="transparent")
        # self.configure(fg_color="darkgoldenrod")
        # self.configure(cursor="hand2")
        # self.configure(menu=None)
        

        # Iniciar centralizado
        # screen_width = self.winfo_screenwidth()
        # screen_height = self.winfo_screenheight()
        # x = int((screen_width / 2) - (1400 / 2))
        # y = int((screen_height / 2) - (780 / 2))
        # self.geometry(f"1400x780+{x}+{y}")
        
        


        # Conf da grid

        self.grid_rowconfigure(0, weight=1)
        self.grid_rowconfigure(1, weight=0)
        self.grid_columnconfigure(0, weight=0)
        self.grid_columnconfigure(1, weight=1)
        

        
        # Frame do Menu
        menu_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        menu_frame.grid(row=0, column=0, sticky="nswe", padx=5, pady=5)
        # Frame do Conteudo
        main_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        main_frame.grid(row=0, column=1, sticky="nsew", padx=5, pady=5)
        # Frame de Lista
        list_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        list_frame.grid(row=1, column=1, sticky="nsew", padx=5, pady=5)
        

              


    ######### Frame Principal (main_frame) #########

        main_frame.grid_rowconfigure(0, weight=1)
        main_frame.grid_columnconfigure(0, weight=3)
        main_frame.grid_columnconfigure(1, weight=2)
        main_frame.grid_columnconfigure(2, weight=1)

        # Grid Superior
        Agendar(main_frame).grid(row=0, column=0, columnspan=2, sticky="nsew")
        
        # Grid Detalhes
        ObjectDetails(main_frame).grid(row=0, column=2, sticky="nsew")
            
        # Grid Inferior
        ListaProdutos(list_frame).pack(side="top", fill="both", expand=True)

        


    ######### Frame Logo #########    
        
        # Logo
        self.logo_frame = ct.CTkFrame(menu_frame, bg_color="transparent", fg_color="transparent")
        self.logo_frame.pack(side="top", pady=10, padx=10)
        
        self.logo = ct.CTkImage(Image.open("logo.png"), size=(150, 150))
        
        self.logo_label = ct.CTkLabel(self.logo_frame, image=self.logo, text="")
        self.logo_label.pack(side="top", pady=10, padx=10)


    ######### Frame de menu (menu_frame) #########ñ

        # Menu de opções    
        self.options_frame = ct.CTkFrame(menu_frame, height=40, bg_color="transparent", fg_color="transparent")
        self.options_frame.pack(side="top", pady=10, padx=10)

        self.options_label = ct.CTkLabel(self.options_frame, text="Clientes:", font=("Calibri", 14))
        self.options_label.pack(side="top", pady=10, padx=10)

        self.options_button = ct.CTkButton(self.options_frame, width=40, text="Cadastrar Cliente", font=("Calibri", 14), command=lambda: create_window_cliente())
        self.options_button.pack(side="top", pady=10, padx=10)

        self.options_button = ct.CTkButton(self.options_frame, width=40, text="Cadastrar Produto", font=("Calibri", 14), command=lambda: create_window_produto())
        self.options_button.pack(side="top", pady=10, padx=10, )


        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        X = 600
        Y = 800
        x = int((screen_width / 2) - (X / 2))
        y = int((screen_height / 2) - (Y / 2))

        def create_window_cliente():
            # window = tk.Toplevel()
            # window.title("Cadastrar Cliente")
            # window.geometry(f"{X}x{Y}+{x}+{y}")
            CadastroCliente(main_frame)

        def create_window_produto():
            # window = tk.Toplevel()
            # window.title("Cadastrar Produto")
            # window.geometry(f"{X}x{Y}+{x}+{y}")
            CadastroProduto(main_frame)


if __name__ == "__main__":
    app = App()
    app.mainloop()
