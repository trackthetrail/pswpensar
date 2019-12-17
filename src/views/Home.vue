<template>
  <div class="home fade-in">
    <section class="section">
      <div class="container has-text-centered">
        <h1 class="title">Bem-Vindo à Loja WPensar!</h1>
        <div class="columns is-centered">
          <div class="column is-3">
            <div
              class="box menu-item"
              @click="$router.push({ name: 'Produtos' })"
            >
              <div class="icon-container">
                <fa-icon icon="shopping-basket" class="has-text-success" />
              </div>

              <span class="subtitle has-text-centered">Consultar Produtos</span>
            </div>
          </div>
          <div class="column is-3">
            <div
              class="box menu-item"
              @click="$router.push({ name: 'Compras' })"
            >
              <div class="icon-container">
                <fa-icon icon="money-bill-wave" class="has-text-primary" />
              </div>

              <span class="subtitle has-text-centered">Registrar Compra</span>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="buttons">
            <a class="button is-primary" @click="logout">
              <strong>Logout</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.menu-item {
  $icon-sz-init: 3rem;
  $icon-sz-active: 4rem;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10rem;

  .icon-container {
    flex-grow: 1;
    width: $icon-sz-active;
    height: $icon-sz-active;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: $icon-sz-init;
      transition: 0.2s ease;
    }
  }

  .subtitle {
    font-size: 1.5rem;
  }

  &:hover {
    cursor: pointer;
    svg {
      font-size: $icon-sz-active;
    }
  }
}
</style>
