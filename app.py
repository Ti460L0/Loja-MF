import customtkinter as ct
import tkinter as tk

from cliente_frames.cadastro_cliente import CadastroCliente
from cliente_frames.consulta_cliente import ConsultaCliente

from produtos_frames.cadastro_produto import CadastroProduto

from PIL import Image



class App(ct.CTk):
    def __init__(self):
        super().__init__()
        
        self.title("Loja-MF")        

        # Iniciar centralizado
        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()
        x = int((screen_width / 2) - (1400 / 2))
        y = int((screen_height / 2) - (780 / 2))
        self.geometry(f"1400x780+{x}+{y}")
        self.overrideredirect(1)
        # Conf da grid

        self.grid_rowconfigure(0, weight=0)
        self.grid_rowconfigure(1, weight=1)
        self.grid_columnconfigure(1, weight=1)

        # Frame superior
        top_frame = ct.CTkFrame(self, height=40, bg_color="transparent", fg_color="goldenrod", corner_radius=5)
        top_frame.grid(row=0, column=0, columnspan=2, sticky="nsew", padx=5, pady=(0,5))
        # Frame do menu
        menu_frame = ct.CTkFrame(self)
        menu_frame.grid(row=1, column=0, sticky="nswe", padx=5, pady=5)
        # Frame do conteudo
        main_frame = ct.CTkFrame(self)
        main_frame.grid(row=1, column=1, rowspan=2 , sticky="nsew", padx=5, pady=5)
        
        

    ######## Frame Superior (top_frame) #########
        
        # Botoes da barra superior 
        self.titulo = ct.CTkLabel(top_frame, text="Sistema de Disponibilização de Produtos - Loja Milla Fashion", font=("Calibri", 15))
        self.titulo.pack(side="left", padx=10)

        self.close_button = ct.CTkButton(top_frame, text="❌", fg_color="transparent", hover_color="red", width=40, font=("Calibri", 15), command=self.destroy)
        self.close_button.pack(side="right", padx=10)    
        
        self.minimize_button = ct.CTkButton(top_frame, text="➖", fg_color="transparent", hover_color="dimgrey", width=40, font=("Calibri", 15), command=self.iconify)
        self.minimize_button.pack(side="right")


    ######### Frame Principal (main_frame) #########
        
        # Importando frame de consulta de clientes dentro do main frame
        self.consulta_frame = ConsultaCliente(master=main_frame)
        self.consulta_frame.pack(fill="both", expand=True)


    ######### MENU LATERAL ##########
        
        # Logo
        self.logo_frame = ct.CTkFrame(menu_frame, bg_color="transparent", fg_color="transparent")
        self.logo_frame.pack(side="top", pady=10, padx=10)
        self.logo = ct.CTkImage(Image.open("logo.png"), size=(150, 150))
        self.logo_label = ct.CTkLabel(self.logo_frame, image=self.logo, text="")
        self.logo_label.pack(side="top", pady=10, padx=10)

       # Campo de pesquisa
        self.search_frame = ct.CTkFrame(menu_frame, border_color="darkgoldenrod", border_width=2, bg_color="transparent", fg_color="transparent")
        self.search_frame.pack(side="top", pady=10, padx=10)

        self.search_frame.grid_columnconfigure(0, weight=1)
        self.search_frame.grid_rowconfigure(0, weight=1)

        # Label de busca
        self.search_label = ct.CTkLabel(self.search_frame, text="Buscar:", font=("Calibri", 20))
        self.search_label.grid(row=0, column=0, sticky="nw", padx=10, pady=(0,10))
        
        # Campo de entrada de busca
        self.search_input = ct.CTkEntry(self.search_frame, width=200)
        self.search_input.grid(row=1, column=0, columnspan=2, sticky="w", padx=(10,0), pady=10)

        # Botão de busca
        self.search_button = ct.CTkButton(self.search_frame, width=40, text="🔎", font=("Calibri", 14), command=self.realizar_busca)
        self.search_button.grid(row=1, column=2, sticky="w", padx=(5,10), pady=10)

        # Opções de busca (Cliente ou Produto)
        self.search_option = ct.CTkSegmentedButton(self.search_frame, values=["Cliente", "Produto"], command=self.search_options)
        self.search_option.grid(row=2, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)

        # Critérios de busca para Cliente e Produto
        self.search_cliente = ct.CTkSegmentedButton(self.search_frame, values=["Nome", "CPF"])
        self.search_produto = ct.CTkSegmentedButton(self.search_frame, values=["Vestido", "Acessório"])    

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

    def search_options(self, value):
        """ Alterna entre os botões de critérios de busca dependendo da opção escolhida. """
        if value == "Cliente":  
            self.search_cliente.grid(row=3, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)
            self.search_produto.grid_forget()  # Esconde as opções de Produto
        elif value == "Produto":
            self.search_cliente.grid_forget()  # Esconde as opções de Cliente
            self.search_produto.grid(row=3, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)
        else:
            self.search_cliente.grid_forget()
            self.search_produto.grid_forget()

    def realizar_busca(self):
        """ Lógica para realizar a busca baseada na opção selecionada. """
        search_value = self.search_input.get()
        search_type = self.search_option.get()

        if search_type == "Cliente":
            criterio = self.search_cliente.get()  # Pode ser "Nome" ou "CPF"
            print(f"Buscando cliente por {criterio}: {search_value}")
        elif search_type == "Produto":
            criterio = self.search_produto.get()  # Pode ser "Vestido" ou "Acessório"
            print(f"Buscando produto por {criterio}: {search_value}")
        else:
            print("Nenhuma opção de busca válida selecionada")
            

        self.bind("<Return>", lambda event: search_function())

        def search_function():
            print("Pesquisando...")

            

        



if __name__ == "__main__":
    app = App()
    app.mainloop()
