import customtkinter as ct

# Variável global para armazenar o produto selecionado
selected_product = None

class InfoProduto(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)

        # Cria uma janela de formulário para exibir os dados do produto selecionado
        self.main_frame = ct.CTkFrame(self, border_color="darkgoldenrod", border_width=1, corner_radius=0)
        self.main_frame.pack(side="top", fill="both")

    @classmethod
    def set_selected_product(cls, product_data):
        """
        Função que recebe os dados do produto selecionado e armazena na variável global.
        
        :param product_data: Dados do produto selecionado (tupla contendo informações do produto).
        """
        global selected_product
        selected_product = product_data
        print(f"Produto selecionado: {selected_product}")

    @classmethod
    def get_selected_product(cls):
        """
        Função que retorna o produto atualmente selecionado.
        
        :return: Dados do produto selecionado ou None se nenhum produto foi selecionado.
        """
        return selected_product

    def display_selected_product_form(self):
        """
        Cria uma janela de formulário para exibir os dados do produto selecionado.
        """
        if selected_product is None:
            return
        # Labels para cada campo
        fields = ["Código", "Modelo/Tipo", "Tamanho", "Cor", "Status", "Valor"]
        for idx, field in enumerate(fields):
            label = ct.CTkLabel(self, text=f"{field}: {selected_product[idx]}", font=("Arial", 14))
            label.pack(padx=10, pady=5)

