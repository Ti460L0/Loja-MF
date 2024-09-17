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
        self.details_frame = ct.CTkFrame(self.main_frame, width=250, bg_color="transparent", fg_color="transparent")
        self.details_frame.pack(side="top", fill="both", padx=10, pady=10)

        global details_instance
        details_instance = self  
        
        self.labels = {}
        self.fields = []
        
    def set_labels(self, labels):
        self.set_fields(None)
        self.labels = labels
        print(self.labels)
        self.create_labels()

    def set_fields(self, data):
        if data is None:
            self.fields = ["Sem dados"] * len(self.labels)  # Garantir que haja um valor padrão para cada label
        else:
            self.fields = data
        self.create_labels()
        print(self.fields)

    def create_labels(self):
        # Limpar widgets antigos
        for widget in self.details_frame.winfo_children():
            widget.destroy()
        
        # Adicionar novos labels e campos
        for idx, label in enumerate(self.labels):
            detail_label = ct.CTkLabel(self.details_frame, text=label, font=("Calibri", 12))
            detail_label.pack(fill="x", anchor="w", padx=10, pady=5)
            
            detail_field_text = self.fields[idx] if idx < len(self.fields) else "Sem dados"
            detail_field = ct.CTkLabel(self.details_frame, text=detail_field_text, fg_color="dimgray", font=("Calibri", 14))
            detail_field.pack(fill="x", anchor="w", padx=10, pady=5)


        

        
       


    

        

