import customtkinter as ct
from tkinter import messagebox
from database.db_connection import connect_db

class CadastroProduto(ct.CTkFrame):
    def __init__(self, master=None):
        super().__init__(master)

        # HotKeys
        self.master.bind("<Return>", self.submit_form)
        self.master.bind("<Escape>", lambda event: self.master.destroy())

        # Validar campos
        validate_cmd = self.register(self.validate_entry)

        ### FRAMES ###

        # Main Frame
        self.main_frame = ct.CTkFrame(self.master, border_color="darkgoldenrod", border_width=5, corner_radius=10)
        self.main_frame.place(relx=0.5, rely=0.5, anchor="center", relwidth=1, relheight=1)

        # Frame do Titulo
        self.title_frame = ct.CTkFrame(self.main_frame, height=50, corner_radius=10)
        self.title_frame.pack(side="top", fill="x", padx=20, expand=True)

        # Frame das entradas Vestido
        self.entradas_frame_vestidos = ct.CTkFrame(self.main_frame)
        self.entradas_frame_vestidos.pack(side="top", fill="x", padx=20, expand=True)

        # Frame das entradas Acessorio
        self.entradas_frame_acessorios = ct.CTkFrame(self.main_frame)
        self.entradas_frame_acessorios.pack(side="top", fill="x", padx=20, expand=True)

        # Titulo
        self.title_label = ct.CTkLabel(self.title_frame, text="Cadastrar produto", font=("Arial", 20))
        self.title_label.pack(side="left", padx=10, pady=10)

        # Subtitulo Cadastrar vestido
        self.subtitle_label = ct.CTkLabel(self.entradas_frame_vestidos, text="Cadastrar vestido")
        self.subtitle_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Subtitulo Cadastrar acessório
        self.subtitle_label = ct.CTkLabel(self.entradas_frame_acessorios, text="Cadastrar acessório")
        self.subtitle_label.grid(row=0, column=0, columnspan=2, pady=10)

        # Modelo vestido
        self.modeloVestido_label = ct.CTkLabel(self.entradas_frame, text='Modelo:')
        self.modeloVestido_label.grid(row=0, column=0, pady=10)
        self.modeloVestido_entry = ct.CTkEntry(self.entradas_frame, width=200)
        self.modeloVestido_entry.grid(row=0, column=1, pady=10)

        # Tamanho vestido
        self.tamanhoVestido_label = ct.CTkLabel(self.entradas_frame_vestidos, text='Tamanho:')
        self.tamanhoVestido_label.grid(row=1, column=0, pady=10)
        self.tamanhoVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=200)
        self.tamanhoVestido_entry.grid(row=1, column=1, pady=10)
        
        # Cor vestido
        self.corVestido_label = ct.CTkLabel(self.entradas_frame_vestidos, text='Cor:')
        self.corVestido_label.grid(row=2, column=0, pady=10)
        self.corVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=200)
        self.corVestido_entry.grid(row=2, column=1, pady=10)
         
        # Status vestido
        self.statusVestido_label = ct.CTkLabel(self.entradas_frame_vestidos, text='Status:')
        self.statusVestido_label.grid(row=3, column=0, pady=10)
        self.statusVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=200)
        self.statusVestido_entry.grid(row=3, column=1, pady=10)
         
        # Valor vestido
        self.valorVestido_label = ct.CTkLabel(self.entradas_frame_vestidos, text='Valor:')
        self.valorVestido_label.grid(row=4, column=0, pady=10)
        self.valorVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=200)
        self.valorVestido_entry.grid(row=4, column=1, pady=10)

        # Código do vestido
        self.codigoVestido_label = ct.CTkLabel(self.entradas_frame_vestidos, text='Código:')
        self.codigoVestido_label.grid(row=5, column=0, pady=10)
        self.codigoVestido_entry = ct.CTkEntry(self.entradas_frame_vestidos, width=200)
        self.codigoVestido_entry.grid(row=5, column=1, pady=10)

        # Tipo de acessório
        self.tipoAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Tipo:')
        self.tipoAcessorio_label.grid(row=0, column=0, pady=10)
        self.tipoAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.tipoAcessorio_entry.grid(row=0, column=1, pady=10)

        # Tamanho acessorio
        self.tamanhoAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Tamanho:')
        self.tamanhoAcessorio_label.grid(row=2, column=0, pady=10)
        self.tamanhoAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.tamanhoAcessorio_entry.grid(row=2, column=1, pady=10)

        # Cor acessorio
        self.corAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Cor:')
        self.corAcessorio_label.grid(row=3, column=0, pady=10)
        self.corAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.corAcessorio_entry.grid(row=3, column=1, pady=10)

        # Status acessorio
        self.statusAcessorio_label = ct.CTkLabel(self.entradas_frame_acessorios, text='Status:')
        self.statusAcessorio_label.grid(row=4, column=0, pady=10)
        self.statusAcessorio_entry = ct.CTkEntry(self.entradas_frame_acessorios, width=200)
        self.statusAcessorio_entry.grid(row=4, column=1, pady=10)

        # Submit
        self.submit_button = ct.CTkButton(self.entradas_frame, text='Cadastrar Produto', command=self.submit_form)
        self.submit_button.grid(row=5, column=2, padx=10, pady=10)
        # Cancel
        self.cancel_button = ct.CTkButton(self.entradas_frame, text='Cancelar', command=self.cancel_form)
        self.cancel_button.grid(row=5, column=3, padx=10, pady=10)

        # Função para enviar o formulário
    def submit_form(self):
        conn = connect_db()
        if conn is None:
            messagebox.showerror("Erro", "Não foi possível conectar ao banco de dados.")
            return

        try:
            cursor = conn.cursor()
        
        # Receber os valores do formulário
        modeloVestido = self.modeloVestido_entry.get()
        tamanhoVestido = self.tamanhoVestido_entry.get()
        corVestido = self.corVestido_entry.get()
        statusVestido = self.statusVestido_entry.get()
        valorVestido = self.valorVestido_entry.get()
        codigoVestido = self.codigoVestido_entry.get()
        tipoAcessorio = self.tipoAcessorio_entry.get()
        tamanhoAcessorio = self.tamanhoAcessorio_entry.get()
        corAcessorio = self.corAcessorio_entry.get()
        statusAcessorio = self.statusAcessorio_entry.get()

        # Inserir os valores no banco de dados
        query_vestidos = "INSERT INTO vestidos (modeloVestido, tamanhoVestido, corVestido, statusVestido, valorVestido, codigoVestido) VALUES (%s, %s, %s, %s, %s, %s)"
        query_acessorios = "INSERT INTO acessorios (tipoAcessorio, tamanhoAcessorio, corAcessorio, statusAcessorio) VALUES (%s, %s, %s, %s)"

        cursor.execute(query_vestidos, (modeloVestido, tamanhoVestido, corVestido, statusVestido, valorVestido, codigoVestido))
        cursor.execute(query_acessorios, (tipoAcessorio, tamanhoAcessorio, corAcessorio, statusAcessorio))

        conn.commit()

        messagebox.showinfo("Sucesso", "Produto inserido com sucesso!")
        self.clear_form()  # Limpa o formulário

    except Exception as e:
            messagebox.showerror("Erro", f"Erro ao inserir: {e}")
            conn.rollback()
    finally:
            cursor.close()
            conn.close()
