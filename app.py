import customtkinter as ct
from cliente_frames.cadastro_cliente import CadastroCliente

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
        CadastroCliente(master=main_frame).pack(fill="both", expand=True)

        ######### MENU LATERAL ##########
        menu_frame = ct.CTkFrame(self, width=100)
        menu_frame.place(relx=0, rely=0.05, anchor='nw', relwidth=0.25, relheight=0.95)

        menu_frame.grid_columnconfigure(0, weight=3)
        menu_frame.grid_columnconfigure(1, weight=1)
        menu_frame.grid_columnconfigure(2, weight=1)
        menu_frame.grid_columnconfigure(3, weight=1)

        # Logo
        self.logo = ct.CTkLabel(menu_frame, text="Logo", font=("Arial", 18))
        self.logo.grid(row=0, column=0, columnspan=3, padx=10, pady=10)

        # Campo de pesquisa
        self.search_label = ct.CTkLabel(menu_frame, text="Pesquisar:", font=("Arial", 18))
        self.search_label.grid(row=1, column=0, rowspan=4, columnspan=2, padx=10, pady=10)
        
        self.search_input = ct.CTkEntry(menu_frame, width=200)
        self.search_input.grid(row=2, column=0, columnspan=2, padx=10, pady=10)
        
        self.search_button = ct.CTkButton(menu_frame, width=40, text="🔎", font=("Arial", 18))
        self.search_button.grid(row=2, column=1)


if __name__ == "__main__":
    app = App()
    app.mainloop()
