import customtkinter as ct

class InfoProduto(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.configure(border_color="darkgoldenrod", border_width=5, corner_radius=10)

        # Main Frame
        self.main_frame = ct.CTkFrame(self, border_color="darkgoldenrod", border_width=5, corner_radius=10)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        self.title_label = ct.CTkLabel(self.main_frame, text="Informações do Produto", font=("Arial", 20))
        self.title_label.place(relx=0.5, rely=0.5, anchor="center")