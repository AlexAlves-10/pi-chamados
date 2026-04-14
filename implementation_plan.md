# Plano de Ação: Seleção de Datas e Integração do Calendário

Para evoluir a lógica temporal do sistema removendo a restrição de que "todo pedido é implicitamente para o dia de hoje", executaremos uma integração ponta-a-ponta entre a página de Pedidos e o Calendário.

## User Review Required

> [!WARNING]
> **Alteração de Banco de Dados Obrigatória**
> A tabela `pedidos` no Supabase precisará possuir uma nova coluna chamada **`data`** (tipo `date` ou `text`). Verifiquei na API neste exato segundo e a coluna ainda não existe (apenas `criado_em`). Sem essa coluna, o sistema de inserção gerará um erro. Certifique-se de adicioná-la no painel do seu Supabase antes ou durante a aplicação desta alteração.

## Proposed Changes

### 1. Novo Campo de Data em Pedidos
#### [MODIFY] [app/pedidos/page.js](file:///c:/Users/matos/Documents/GitHub/pi-chamados/app/pedidos/page.js)
*   **Estado**: Criação da variável `['data', setData]`.
*   **Auto-Preenchimento**: Leitura da URL (`?data=XXXX-XX-XX`). Se o usuário vier do Calendário clicando num determinado dia, a data já vem selecionada no modal do pedido automaticamente!
*   **UI**: Inserção de um campo `<input type="date">` no formulário "Novo Pedido" com atributos customizados de tema. Modificarei também a tabela para demonstrar a Data para quem visualiza.
*   **Validação e Envio**: Trava no `salvar()` caso a Data não seja escolhida, e inserção do campo no objeto global do Supabase (`dados = { ... , data: data }`).

### 2. Refatoração Visual e Lógica do Calendário
#### [MODIFY] [app/calendario/page.js](file:///c:/Users/matos/Documents/GitHub/pi-chamados/app/calendario/page.js)
*   **Nova Lógica (backend)**: Em vez de agrupar pela data mecânica de `criado_em`, passaremos a agrupar pela coluna referencial informada pelo funcionário (`p.data`).
*   **Contraste (Light Mode)**: Ajuste nas bordas de `var(--glass-border)` para `rgba(100,100,100, 0.15)` quando não houver modo escuro engatilhado, para as grades aparecerem firmes num céu claro.
*   **Hover Elegante**: Transição CSS suave infundida no React. Ao passar o mouse, a caixa reagirá com uma "elevação" (`transform: translateY`) e brilho sombreado (`box-shadow`), para encorajar percepção de clique.
*   **Dia Cheio (Full)**: O estilo condicional de *Dia Cheio* perderá a delicadeza e dominará a caixa inteira com um vermelho-rubi de fundo (opacidade baixa) e letra sangria (vermelho vivo), emitindo um grito visual alto de "LOTADO".

## Open Questions

- Na tabela da página de "Pedidos", devo exibir a coluna "Data Escolhida" ou prefere manter a tabela focada nas colisões de *Usuário > Setor > Equipamento* e a "Data" ser visível apenas no calendário? 
- Lembre-se que para continuarmos você deve aprovar este plano e se assegurar que a coluna `data` estará presente no painel SQL do seu banco vinculada à tabela de `pedidos`! Posso aplicar o código?
