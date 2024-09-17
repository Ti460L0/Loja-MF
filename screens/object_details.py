import customtkinter as ct


# Variável global para armazenar o produto selecionado e a instância de detalhes
selected_product = None
details_instance = None

class ObjectDetails(ct.CTkFrame):  # Ou InfoProduto se for o nome da classe
    def __init__(self, master):
        super().__init__(master)


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

        global details_instance
        details_instance = self  
        
        self.labels = {}
        self.fields = []

    def create_fields():
        """Fun o para criar campos e labels de acordo com o tipo de produto"""
        for i, field in enumerate(self.fields):
            label = ct.CTkLabel(self.details_frame, text=field, font=("Calibri", 12))
            label.grid(row=i, column=0, padx=10, pady=5, sticky="e")
            self.labels[field] = label
            entry = ct.CTkEntry(self.details_frame, width=300)
            entry.grid(row=i, column=1, padx=10, pady=5, sticky="w")
            self.labels[f"{field}_entry"] = entry
        
    def set_labels(self, labels):
        self.labels = labels
        print(self.labels)

    def set_fields(self, data):
        self.fields = data
        print(self.fields)

        

