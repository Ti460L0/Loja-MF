import customtkinter as ct
import tkinter as tk
from tkinter import messagebox

class App(ct.CTk):
    def __init__(self):
        super().__init__()

        # Create menu bar
        self.menu_bar = tk.Menu(self)
        self.config(menu=self.menu_bar)

        # Create file menu
        self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.file_menu.add_command(label="Exit", command=self.destroy)
        self.menu_bar.add_cascade(label="File", menu=self.file_menu)

        # Create Formulário menu
        self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.file_menu.add_command(label="Cadastrar", command=self.destroy)
        self.file_menu.add_command(label="Consultar", command=self.destroy)
        self.file_menu.add_command(label="Agenda", command=self.destroy)
        self.menu_bar.add_cascade(label="Formulario", menu=self.file_menu)

        # Create Sobre menu
        self.file_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.file_menu.add_command(label="Sobre", command=lambda: self.show_form("sobre"))
        self.menu_bar.add_cascade(label="Sobre", menu=self.file_menu)

        # Set window properties
        self.title("Form Example")
        self.geometry("1000x600")


        # Menu bar
        self.form_frame = ct.CTkFrame(self, corner_radius=10, fg_color="blue")
        self.form_frame.pack(side="top", padx=5, pady=5, fill="both")

        self.cad_button = ct.CTkButton(self.form_frame, text="Cadastrar", command=lambda: self.show_form("cadastro"))
        self.cad_button.pack(side="left", padx=5, pady=5)

        self.con_button = ct.CTkButton(self.form_frame, text="Consultar", command=lambda: self.show_form("consulta"))
        self.con_button.pack(side="left", padx=5, pady=5)

        self.text1 = ct.CTkLabel(self.form_frame, text="TEXTO QUALQUER", text_color="red")
        self.text1.pack(side="left", padx=5, pady=5)

        self.agenda_button = ct.CTkButton(self.form_frame, text="Agenda", command=lambda: self.show_form("agenda"))
        self.agenda_button.pack(side="left", padx=5, pady=5)        
       


        # Formulário de cadastro
        self.form_cadastro = ct.CTkFrame(self, corner_radius=10, fg_color="red")
        self.form_cadastro.pack(pady=20, padx=20, fill="both", expand=True)

        self.name_label = ct.CTkLabel(self.form_cadastro, text="ID:")
        self.name_label.pack()
        self.name_entry = ct.CTkLabel(self.form_cadastro, text="0", state="disabled")
        self.name_entry.pack()

        self.name_label = ct.CTkLabel(self.form_cadastro, text="Produto:")
        self.name_label.pack()
        self.name_entry = ct.CTkEntry(self.form_cadastro, width=200, placeholder_text="Insira o nome do produto")
        self.name_entry.pack()

        self.email_label = ct.CTkLabel(self.form_cadastro, text="Preço:")
        self.email_label.pack()
        self.email_entry = ct.CTkEntry(self.form_cadastro, width=200)
        self.email_entry.pack()

        self.acessorios = ct.CTkCheckBox(self.form_cadastro, text="Acessórios")
        self.acessorios.pack()
        self.acessorios_values = ["Cadeira", "Mesa", "Sofa"]
        self.acessorios_vars = []
        for value in self.acessorios_values:
            var = tk.IntVar()
            self.acessorios_vars.append(var)
            ct.CTkCheckBox(self.form_cadastro, text=value, variable=var).pack()

        self.submit_button = ct.CTkButton(self.form_cadastro, text="Submit", command=lambda: self.submit_form())
        self.submit_button.pack(pady=10)
        self.submit_button = ct.CTkButton(self.form_cadastro, text="Sair", command=lambda: self.destroy())
        self.submit_button.pack(pady=10)



        # Formulário de consulta
        self.form_consulta = ct.CTkFrame(self, corner_radius=10, fg_color="green")
        self.form_consulta.pack(pady=20, padx=20, fill="both", expand=True)

        self.name_label = ct.CTkLabel(self.form_consulta, text="Produto:")
        self.name_label.pack()
        self.name_entry = ct.CTkEntry(self.form_consulta, width=200)
        self.name_entry.pack()

        self.email_label = ct.CTkLabel(self.form_consulta, text="Preço:")
        self.email_label.pack()
        self.email_entry = ct.CTkEntry(self.form_consulta, width=200)
        self.email_entry.pack()

        # Formulário de financeiro
        self.form_financeiro = ct.CTkFrame(self, corner_radius=10, fg_color="yellow")
        self.form_financeiro.pack(pady=20, padx=20, fill="both", expand=True)

        self.name_label = ct.CTkLabel(self.form_financeiro, text="Name:")
        self.name_label.pack()
        self.name_entry = ct.CTkEntry(self.form_financeiro, width=200)
        self.name_entry.pack()

        self.email_label = ct.CTkLabel(self.form_financeiro, text="Email:")
        self.email_label.pack()
        self.email_entry = ct.CTkEntry(self.form_financeiro, width=200)
        self.email_entry.pack()



        # Tela do sobre
        self.sobre = ct.CTkFrame(self, corner_radius=10, fg_color="pink")
        self.sobre.pack(pady=20, padx=20, fill="both", expand=True) 



        # Esconder o formulário inicialmente

        self.form_consulta.pack_forget()
        self.form_cadastro.pack_forget()
        self.form_financeiro.pack_forget()
        self.sobre.pack_forget()


    # Função para mostrar o formulário

    def show_form(self, form_name):
        if form_name == "consulta":
            self.form_consulta.pack()
            self.form_cadastro.pack_forget()
            self.form_financeiro.pack_forget()
            self.sobre.pack_forget()
        elif form_name == "cadastro":
            self.form_cadastro.pack()
            self.form_consulta.pack_forget()
            self.form_financeiro.pack_forget()
            self.sobre.pack_forget()
        elif form_name == "agenda":
            self.form_financeiro.pack()
            self.form_consulta.pack_forget()
            self.form_cadastro.pack_forget()
            self.sobre.pack_forget()
        elif form_name == "sobre":
            self.sobre.pack()
            self.form_consulta.pack_forget()
            self.form_cadastro.pack_forget()
            self.form_financeiro.pack_forget()



        # função para enviar o formulário

    def submit_form(self):
        name = self.name_entry.get()
        email = self.email_entry.get()
        if name and email:
            messagebox.showinfo("Form Submitted", f"Name: {name}, Email: {email}")
        else:
            messagebox.showerror("Error", "Please fill in all fields")

if __name__ == "__main__":
    app = App()
    app.mainloop()


