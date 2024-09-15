import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class ListaProdutos(ct.CTkFrame):
    def __init__(self, master):
        super().__init__(master)
        self.master = master
        self.configure(border_color="darkgoldenrod")

        # Main Frame
        self.main_frame = ct.CTkFrame(self, border_color="darkgoldenrod", border_width=1)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=0)
        self.title_frame.pack(side="top", fill="x")

        self.titulo_label = ct.CTkLabel(self.title_frame, text="Lista geral de: ", font=("Arial", 15))
        self.titulo_label.grid(row=0, column=0, padx=10, pady=10)

        self.change_button = ct.CTkSegmentedButton(self.title_frame, values=["Vestidos", "Acessórios", "Clientes"], command=self.change_frame)
        self.change_button.set("Vestidos")
        self.change_button.grid(row=0, column=1, padx=10, pady=10)
        
        # Cabeçalhos da Tabela
        self.header_frame = ct.CTkFrame(self.main_frame, border_color="darkgoldenrod", border_width=1, corner_radius=0)
        self.header_frame.pack(side="top", fill="x")

        headers = ["Código", "Modelo/Tipo", "Tipo", "Tamanho", "Cor", "Status", "Valor" ]
        for col, header in enumerate(headers):
            label = ct.CTkLabel(self.header_frame, text=header, font=("Arial", 14, "bold"))
            label.grid(row=1, column=col, padx=10, pady=10)

        # Tabela de produtos
        self.lista_frame = ct.CTkScrollableFrame(self.main_frame)
        self.lista_frame.pack(side="top", fill="x")

        self.load_data()

    def change_frame(self, value):
        if value == "Vestidos":
            self.master.change_frame("vestidos")
            print("Vestidos")
        elif value == "Acessórios":
            self.master.change_frame("acessorios")
            print("Acessórios")
        elif value == "Clientes":
            self.master.change_frame("clientes")
            print("Clientes")

    def load_data(self):
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return
        
        try:
            cursor = conn.cursor()

            # Consultar vestidos
            cursor.execute("SELECT 'Vestido',codigo_vestido, modelo_vestido, tamanho_vestido, cor_vestido, status_vestido, valor_vestido FROM vestidos")
            vestidos = cursor.fetchall()

            # # Consultar acessórios
            # cursor.execute("SELECT 'Acessório', tipo_acessorio, tamanho_acessorio, cor_acessorio, status_acessorio, NULL, NULL FROM acessorios")
            # acessorios = cursor.fetchall()

            # # Unir os dados

            # # Exibir os produtos na tabela
            for row, vestido in enumerate(vestidos, start=1):
                 for col, value in enumerate(vestido):
                     label = ct.CTkLabel(self.lista_frame, text=value if value is not None else "", font=("Arial", 12))
                     label.grid(row=row, column=col, padx=10, pady=5)

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao carregar dados: {e}")

        finally:
            cursor.close()
            conn.close()

