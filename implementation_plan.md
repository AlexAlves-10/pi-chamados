# Padronização Visual e Tema Claro/Escuro

Este plano de implementação detalha as alterações necessárias para aplicar melhorias visuais abrangentes e padronizadas em todo o sistema, com suporte a temas claro e escuro, usando a arquitetura de variáveis CSS e Bootstrap.

## General Approach

1.  **Variáveis CSS (`globals.css`)**
    *   Definiremos todas as cores como variáveis no escopo do `:root` (tema claro) e `:root[data-theme='dark']` (tema escuro).
    *   Criaremos classes utilitárias CSS para efeitos de `glassmorphism`, gradientes e texturas de fundo.
    
2.  **Alternador de Tema (`ThemeToggle`)**
    *   Criaremos um componente dedicado para alternar o tema, manipulando local storage e a propriedade `data-theme` no `document.documentElement`.
    *   Para evitar cintilação (flicker) no carregamento, adicionaremos um pequeno script no lado cliente para pré-carregar o tema ou faremos o hook em `layout.js` e `MenuLateral.js`.

3.  **Refatoração de Estilos em Componentes e Páginas**
    *   Removeremos hard-coded e inline styles na maioria das páginas (e.g. `page.js`, `dashboard/page.js`, `cadastro/page.js`, e outras).
    *   Substituiremos cores do Bootstrap (ex: `bg-light`, `bg-white`, `text-dark`, etc.), nos lugares que demandam adaptação para o modo escuro, por classes globais suportadas pelas variáveis CSS, ou adaptando via SCSS/CSS nativo.
    *   Aplicaremos os mesmos efeitos de glassmorphism já vistos na tela inicial para outros cards como login, dashboard, e tabelas.

## User Review Required

> [!WARNING]
> Muitas das páginas atualmente misturam uso pesado de estilos inline (ex: `style={{ backgroundColor: "rgba..." }}`) e variações de CSS do Bootstrap. A remoção destes estilos pode influenciar o layout de algumas tabelas. Gostaria de confirmar se todas as páginas devem usar obrigatoriamente o visual "Glassmorphism" (cards semi-transparentes flutuando sobre um gradiente animado/misto) ou se apenas os cards usarão glassmorphism com fundos sólidos dentro da área interna?
> Assumirei pela sua instrução que será padronização *completa*, então um fundo geral com gradiente cobrirá o sistema, enquanto painéis usarão estilo "vidro" (glass) na frente, alterando cores e sombras conforme claro/escuro.

## Proposed Changes

### Configuration & Base Layout

#### [MODIFY] [globals.css](file:///C:/Users/matos/Documents/GitHub/pi-chamados/app/globals.css)
*   Adicionar declarações de variáveis CSS.
*   Criar seletores `[data-theme='dark']`.
*   Criar classes de tipografia, `glass-card`, `glass-input` e `gradient-bg` globais.

#### [MODIFY] [layout.js](file:///C:/Users/matos/Documents/GitHub/pi-chamados/app/layout.js)
*   Integrar script na tag `<head>` para inicializar tema do `localStorage` prevenindo flicker.
*   Atualizar lógica de wrapper geral do background.

### UI Components

#### [MODIFY] [MenuLateral.js](file:///C:/Users/matos/Documents/GitHub/pi-chamados/app/components/MenuLateral.js)
*   Modificar cores para usar variáveis CSS (via `globals.css` ou `MenuLateral.css` usando as globais).
*   Adicionar botão/switch "Modo Escuro / Claro" com persistência no `localStorage`.

#### [MODIFY] [MenuLateral.css](file:///C:/Users/matos/Documents/GitHub/pi-chamados/app/components/MenuLateral.css)
*   Adaptar para herdar as variáveis do document.

### Pages Standardization

#### [MODIFY] Diversos Arquivos `page.js` e `.css` associados
*   **Home**, **Dashboard**, **Cadastro**, **Equipamentos**, **Usuarios**, **Pedidos**, **Setores**, **Login**, **Painel**, **Calendário**:
    *   Substituir estilos de background, texto e elementos do Bootstrap.
    *   Aplicar padrão `<div className="custom-gradient-bg">` e `<div className="glass-card">`.
    *   Refatorar tabelas para usarem variações do Bootstrap dark/light dinamicamente.

## Open Questions

Nenhuma no momento, aguardo revisão da proposta de uso geral de painéis "Glassmorphism" sobre um fundo gradiente, ou se isso for muito exagerado para uma dashboard corporativa, posso limitar a tela inicial a glassmorphism e usar fundos minimalistas elegantes na área interna (dashboard, listagens).

## Verification Plan

### Manual Verification
*   Navegar na aplicação web usando um browser test.
*   Conferir página por página para garantir que as tabelas fiquem visíveis no Dark Mode (contraste correto de texto sobre fundos de tabela e formulários).
*   Testar se o `localStorage` mantém o tema correto ao fazer F5.
