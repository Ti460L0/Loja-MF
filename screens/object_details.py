import customtkinter as ct

# Variável global para armazenar o produto selecionado e a instância de detalhes
selected_product = None
details_instance = None  # Variável para armazenar a instância que exibe os detalhes

class ObjectDetails(ct.CTkFrame):  # Ou InfoProduto se for o nome da classe
    def __init__(self, master):
        super().__init__(master)

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
