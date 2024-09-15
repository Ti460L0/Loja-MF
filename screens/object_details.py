import customtkinter as ct

# Variável global para armazenar o produto selecionado e a instância de detalhes
selected_product = None
details_instance = None  # Variável para armazenar a instância que exibe os detalhes

class ObjectDetails(ct.CTkFrame):  # Ou InfoProduto se for o nome da classe
    def __init__(self, master):
        super().__init__(master)

        # Campo de pesquisa
        self.search_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent")
        self.search_frame.pack(side="top", pady=10)

        self.search_frame.grid_columnconfigure(0, weight=1)
        self.search_frame.grid_rowconfigure(0, weight=1)

        # Label de busca
        self.search_label = ct.CTkLabel(self.search_frame, text="Buscar:", font=("Calibri", 20))
        self.search_label.grid(row=0, column=0, sticky="nw", padx=10, pady=(0,10))
        
        # Campo de entrada de busca
        self.search_input = ct.CTkEntry(self.search_frame, font=("Calibri", 14))
        self.search_input.grid(row=1, column=0, columnspan=2, sticky="w", padx=(10,0), pady=10)
        self.search_input.bind("<Return>", self.realizar_busca)
        self.search_input.bind("<FocusIn>", lambda event: self.search_input.delete(0, "end"))

        # Botão de busca
        self.search_button = ct.CTkButton(self.search_frame, width=20, text="🔎", font=("Calibri", 20), bg_color='transparent', fg_color='transparent', border_color='goldenrod', border_width=1, command=self.realizar_busca)
        self.search_button.grid(row=1, column=2, sticky="w", padx=(5,10), pady=10)

        # Opções de busca (Cliente ou Produto)
        self.search_option = ct.CTkSegmentedButton(self.search_frame, values=["Cliente", "Produto"], command=self.search_options)
        self.search_option.grid(row=2, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)

        # Critérios de busca para Cliente e Produto
        self.search_cliente = ct.CTkSegmentedButton(self.search_frame, values=["Nome", "CPF"])
        self.search_produto = ct.CTkSegmentedButton(self.search_frame, values=["Vestido", "Acessório"])    


        #### FORMULÁRIO DE DETALHES ####


        # Cria uma janela de formulário para exibir os dados do produto selecionado
        self.main_frame = ct.CTkFrame(self, bg_color="transparent", fg_color="transparent", corner_radius=5)
        self.main_frame.pack(side="top", fill="x")

        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=0)
        self.title_frame.pack(side="top", fill="both")

        self.title_label = ct.CTkLabel(self.title_frame, text="Detalhes do Produto", font=("Calibri", 15))
        self.title_label.pack(side="left", padx=10, pady=5)

        # Frame para detalhes do produto
        self.details_frame = ct.CTkFrame(self.main_frame, width=400, bg_color="transparent", fg_color="transparent")
        self.details_frame.pack(side="top", fill="both", padx=10, pady=10)

        # Labels para cada campo, que serão preenchidos com os dados do produto selecionado
        self.labels = {}
        fields = ["Código", "Modelo/Tipo", "Tamanho", "Cor", "Status", "Valor"]

        for idx, field in enumerate(fields):
            label_field = ct.CTkLabel(self.details_frame, text=f"{field}:", font=("Calibri", 15))
            label_field.grid(row=idx, column=0, sticky="w", padx=10, pady=5)

            self.labels[field] = ct.CTkLabel(self.details_frame, text="", font=("Calibri", 15))
            self.labels[field].grid(row=idx, column=1, sticky="w", padx=10, pady=5)

        # Armazena a instância na variável global
        global details_instance
        details_instance = self  # Define a instância que exibirá os detalhes

    def search_options(self, value):
        """ Alterna entre os botões de critérios de busca dependendo da opção escolhida. """
            
        if value == "Cliente":  
            self.search_cliente.grid(row=3, column=0, columnspan=3, sticky="nsew", padx=10, pady=10)
            self.textValue = "Digite nome ou CPF"
            self.search_input.delete(0, "end")
            self.search_input.insert(0, self.textValue)
            self.search_produto.grid_forget()  # Esconde as opções de Produto
        elif value == "Produto":
            self.search_cliente.grid_forget()  # Esconde as opções de Cliente
            self.textValue = "Digite vestido ou acessoário"
            self.search_input.delete(0, "end")
            self.search_input.insert(0, self.textValue)
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


    @classmethod
    def set_selected_product(cls, product_data):
        """
        Função que recebe os dados do produto selecionado, armazena na variável global,
        e chama a função para exibir os dados automaticamente.
        
        :param product_data: Dados do produto selecionado (tupla contendo informações do produto).
        """
        global selected_product
        selected_product = product_data
        print(f"Produto selecionado: {selected_product}")
        
        # Chama automaticamente a função para exibir os detalhes do produto
        if details_instance is not None:
            details_instance.display_selected_product()

    def display_selected_product(self):
        """
        Atualiza o formulário com os dados do produto selecionado.
        """
        # Limpa os campos antes de exibir os dados do produto
        for label in self.labels.values():
            label.configure(text="")
            
        global selected_product
        if selected_product is not None:
            fields = ["Código", "Modelo/Tipo", "Tamanho", "Cor", "Status", "Valor"]
            for idx, field in enumerate(fields):
                self.labels[field].configure(text=selected_product[idx] if idx < len(selected_product) else "")
        else:
            print("Nenhum produto foi selecionado.")
