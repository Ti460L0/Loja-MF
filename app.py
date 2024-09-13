import customtkinter as ct

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

        # Formulário superior (top_frame)
        top_frame = ct.CTkFrame(self,  height=40)
        top_frame.place(relx=0, rely=0, anchor='nw', relwidth=1, relheight=0.05)

        # Formulário menu
        menu_frame = ct.CTkFrame(self, width=100)
        menu_frame.place(relx=0, rely=0.05, anchor='nw', relwidth=0.25, relheight=0.95)

        # Formulário main
        main_frame = ct.CTkFrame(self)
        main_frame.place(relx=1, rely=0.05, anchor='ne', relwidth=0.745, relheight=0.95)


        #Botoes da barra superior 
        self.close_button = ct.CTkButton(top_frame, text="❌",fg_color="transparent", hover_color="red", width=40, command=self.destroy)
        self.close_button.pack(side="right", padx=10)
        self.minimize_button = ct.CTkButton(top_frame, text="➖",fg_color="transparent", hover_color="dimgrey", width=40, command=self.iconify)
        self.minimize_button.pack(side="right")


if __name__ == "__main__":
    app = App()
    app.mainloop()
