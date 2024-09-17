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

        
        
        self.title("Loja-MF")   

        # Conf da janela
        # self.configure(borderwidth=5, border_color="darkgoldenrod")
        # self.configure(bg_color="transparent")
        # self.configure(fg_color="darkgoldenrod")
        # self.configure(cursor="hand2")
        # self.configure(menu=None)
        

        # Iniciar centralizado e maximizar ao carregar

        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        x = int((screen_width / 2) - (1400 / 2))
        y = int((screen_height / 2) - (780 / 2))
        self.geometry(f"1400x780+{x}+{y}")
        # self.after(100, lambda: self.state("zoomed") if self.winfo_exists() else None)
        
        


        # Conf da grid

        self.grid_rowconfigure(0, weight=2)
        self.grid_rowconfigure(1, weight=1)
        self.grid_columnconfigure(0, weight=0)
        self.grid_columnconfigure(1, weight=1)
        self.grid_columnconfigure(2, weight=0, minsize=250)
        
        # Frame do Menu
        menu_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        menu_frame.grid(row=0, column=0, sticky="nswe", padx=5, pady=5)
        # Frame do Conteudo
        main_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        main_frame.grid(row=0, column=1, sticky="nsew", padx=5, pady=5)
        
        details_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        details_frame.grid(row=0, column=2, sticky="nsew", padx=5, pady=5)
        # Frame de Lista
        list_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        list_frame.grid(row=1, column=1, sticky="nsew", padx=5, pady=5)
        

              


    ######### Frame Principal (main_frame) #########

        main_frame.grid_rowconfigure(0, weight=1)
        main_frame.grid_columnconfigure(0, weight=3)
        main_frame.grid_columnconfigure(1, weight=2)
        main_frame.grid_columnconfigure(2, weight=1)

        # Grid Superior
        agendar_frame = Agendar(main_frame)
        agendar_frame.pack(side="top", fill="both", expand=True)
        
        # Grid Detalhes
        object_details = ObjectDetails(details_frame)
        object_details.pack(side="top", fill="both", expand=True)
            
        # Grid Inferior
        lista_produtos = ListaProdutos(list_frame, object_details)
        lista_produtos.pack(side="top", fill="both", expand=True)

        
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

        self.cad_button = ct.CTkButton(self.options_frame, width=40, text="Cadastrar Cliente", font=("Calibri", 14), command=lambda: create_window_cliente())
        self.cad_button.pack(side="top", pady=10, padx=10)

        self.con_button = ct.CTkButton(self.options_frame, width=40, text="Cadastrar Produto", font=("Calibri", 14), command=lambda: create_window_produto())
        self.con_button.pack(side="top", pady=10, padx=10, )


        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        X = 600
        Y = 800
        x = int((screen_width / 2) - (X / 2))
        y = int((screen_height / 2) - (Y / 2))

        def create_window_cliente():
            CadastroCliente(main_frame)
            Agendar(main_frame).pack_forget()
            CadastroProduto(main_frame).pack_forget()

        def create_window_produto():
            CadastroProduto(main_frame)
            CadastroCliente(main_frame).pack_forget()
            Agendar(main_frame).pack_forget()


if __name__ == "__main__":
    app = App()
    app.mainloop()
