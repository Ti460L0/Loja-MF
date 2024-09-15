import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db
from screens.info_produto import InfoProduto

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

        self.change_button = ct.CTkSegmentedButton(self.title_frame, values=["Vestidos", "Acessórios", "Clientes"], command=self.change_option)
        self.change_button.set("Vestidos")
        self.change_button.grid(row=0, column=1, padx=10, pady=10)

        # Cabeçalhos da Tabela
        self.header_frame = ct.CTkFrame(self.main_frame, border_color="darkgoldenrod", border_width=1, corner_radius=0)
        self.header_frame.pack(side="top", fill="x")

        self.headers = ["Código", "Modelo/Tipo", "Tamanho", "Cor", "Status", "Valor"]
        self.create_headers()
        

        # Tabela de produtos
        self.lista_frame = ct.CTkScrollableFrame(self.main_frame)
        self.lista_frame.pack(side="top", fill="x")

        self.data_type = "vestidos"  # Tipo padrão ao iniciar o programa
        self.load_data()

    def create_headers(self):
        """
        Cria cabeçalhos da tabela com base nos valores em self.headers.
        """
        for col, header in enumerate(self.headers):
            label = ct.CTkLabel(self.header_frame, text=header, font=("Arial", 14, "bold"))
            label.grid(row=1, column=col, padx=10, pady=10)

    def change_option(self, value):
        """
        Alterna o tipo de dados exibidos na lista (vestidos, acessórios, ou clientes).
        """
        if value == "Vestidos":
            self.data_type = "vestidos"
        elif value == "Acessórios":
            self.data_type = "acessorios"
        elif value == "Clientes":
            self.data_type = "clientes"

        # Recarregar a lista com base no tipo selecionado
        self.load_data()

    def on_item_click(self, item_data):
        """
        Função que captura o clique em um item da lista e envia os dados para info_produto.py.
        
        :param item_data: Tupla com os dados do item (vestido/acessório/cliente).
        """
        InfoProduto.set_selected_product(item_data)  # Chama a função para armazenar o item selecionado
        print(f"Produto {item_data[1]} selecionado.")  # Exibe o item selecionado no console

    def load_data(self):
        """
        Carrega os dados do banco de dados com base no tipo selecionado (vestidos, acessórios ou clientes).
        """
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        # Limpa a lista de produtos antes de carregar novos dados
        for widget in self.lista_frame.winfo_children():
            widget.destroy()

        try:
            cursor = conn.cursor()

            if self.data_type == "vestidos":
                cursor.execute("SELECT codigo_vestido, modelo_vestido, tamanho_vestido, cor_vestido, status_vestido, valor_vestido FROM vestidos")
                items = cursor.fetchall()
            elif self.data_type == "acessorios":
                cursor.execute("SELECT tipo_acessorio, tamanho_acessorio, cor_acessorio, status_acessorio, NULL FROM acessorios")
                items = cursor.fetchall()
            elif self.data_type == "clientes":
                cursor.execute("SELECT nome, cpf, email, telefone, endereco, cep, bairro, observacao, NULL FROM clientes")
                items = cursor.fetchall()

            # Exibir os produtos na tabela
            for row, item in enumerate(items, start=1):
                for col, value in enumerate(item):
                    label = ct.CTkLabel(self.lista_frame, text=value if value is not None else "", font=("Arial", 12))
                    label.grid(row=row, column=col, padx=10, pady=5)

                # Adicionar evento de clique (botão "Selecionar")
                select_button = ct.CTkButton(self.lista_frame, text="Selecionar", command=lambda i=item: self.on_item_click(i))
                select_button.grid(row=row, column=len(item), padx=10, pady=5)

        except Exception as e:
            messagebox.showerror("Erro", f"Erro ao carregar dados: {e}")

        finally:
            cursor.close()
            conn.close()

