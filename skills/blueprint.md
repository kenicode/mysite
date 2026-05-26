# Blueprint do Sistema - MySite Renato Chagas (KeniCode)

## 1. Visão Geral e Objetivo
Um portfólio interativo, rápido e altamente dinâmico focado em atrair empresas (especialmente do exterior, para trabalho remoto) ou clientes nacionais. O foco é apresentar o perfil técnico e a maturidade profissional de forma visualmente rica e tecnicamente impecável.

## 2. Funcionalidades Principais (MVP) e Sugestões Adicionais
1. **Navegação Lateral (Sidebar):** Acesso instantâneo a seções organizadas como: *Projetos Concluídos, Em Andamento, Futuros, Estudos e Documentações.*
2. **Visualização Rica de Projetos (Dynamic View):** Em vez de telas simples, a apresentação do projeto terá suporte a:
   - Galeria de imagens e vídeos embutidos.
   - Renderização nativa de Markdown (estilo README rico do GitHub).
   - Snippets de código explicados (para mostrar domínio da linguagem).
   - Detalhes técnicos e métricas.
3. **Filtro Avançado de Stack Técnico:** Recrutadores podem filtrar projetos com base em linguagens específicas (ex: "Quero ver apenas o que ele fez com Next.js e TypeScript").
4. ***(Sugestão da IA)* Gestão Dinâmica (CMS Próprio):** Em vez de engessar o código (hardcode), teremos uma rota oculta (`/admin`) protegida por senha, de onde você pode adicionar, editar ou remover projetos e estudos diretamente pelo site, que salvará no Supabase.

## 3. Entidades e Modelagem Lógica (PostgreSQL)
* **`Project`**: Representa um projeto, estudo ou documentação.
  - Campos: `id`, `title`, `slug` (URL amigável), `summary`, `content_md`, `status` (FINISHED, IN_PROGRESS, FUTURE, STUDY), `is_published`, timestamps.
* **`Technology`**: Linguagens, ferramentas e frameworks.
  - Campos: `id`, `name`, `icon` (string para ícone do Lucide ou URL).
* **`ProjectTechnology`**: Tabela de junção para mapear qual projeto usa quais tecnologias (Relacionamento N:N).
* **`ProjectMedia`**: Imagens e vídeos associados a um projeto.
  - Campos: `id`, `project_id`, `media_url`, `media_type` (IMAGE, VIDEO), `description`.

## 4. Papéis e Permissões (Segurança / RLS)
* **Público (Recrutadores / Visitantes):** Permissão **estritamente de LEITURA** para os dados da tabela `Project` onde `is_published = true`.
* **Administrador (Você):** Utilizando a autenticação do Supabase, apenas você terá permissões de **LEITURA, INSERÇÃO, ATUALIZAÇÃO e EXCLUSÃO** (CRUD). Nenhuma Server Action de mutação funcionará sem o cookie/token válido de administrador.

## 5. Estrutura de Telas e Interface
* **Layout Base (`/app/layout.tsx`):**
  - **Sidebar (Lateral):** Contém navegação principal, links para redes (LinkedIn/GitHub), botão de currículo e filtros.
* **Página Inicial (`/`):**
  - Resumo profissional, CTA (Call to Action) e os projetos marcados como "Destaque".
* **Página de Visualização de Projeto (`/project/[slug]`):**
  - Componentes complexos renderizando imagens, markdown e blocos de código com syntax highlighting.
* **Área Restrita Administrativa (`/admin/*`):**
  - Dashboard simples com tabela listando projetos e botão "Novo Projeto".
  - Formulário com validação Zod para editar o markdown, metadados e subir imagens para o Supabase Storage.

## 6. Fluxos Ponta a Ponta
**Acesso de um Recrutador:**
1. Acessa o link gerado pelo Cloudflare Pages.
2. Navega pelas seções na Sidebar instantaneamente (Single Page Feel).
3. Lê os detalhes profundos do código e arquitetura de um projeto na visualização dinâmica, com imagens e vídeos carregando rapidamente.

**Você atualizando seu Portfólio:**
1. Acessa a rota `/admin` e faz login.
2. Preenche o formulário seguro (validado via Zod).
3. A Server Action no Next.js invoca o Prisma, salva no Supabase e invalida o cache da página no Edge. O novo projeto já aparece ao vivo.
