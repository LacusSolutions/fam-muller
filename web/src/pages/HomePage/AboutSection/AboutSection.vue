<script setup lang="ts"></script>

<template>
  <section id="about" class="HomePage-AboutSection-root">
    <header class="HomePage-AboutSection-header">Sobre a Família Müller</header>

    <div class="HomePage-AboutSection-body">
      <img
        src="https://images.unsplash.com/photo-1542216515-4e6a586c1ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b2xkJTIwZmFtaWx5fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        alt="old family photo"
      />

      <div>
        <p>
          Lorem ipsum dolor sit amet, dolore in quas et, temporibus accusamus voluptas sunt totam
          officia. Ducimus quos error voluptates.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius cupiditate veritatis officia
          vel corrupti obcaecati culpa voluptate qui accusantium id, non voluptatum animi magni
          eveniet maiores laboriosam blanditiis et quas.
        </p>
        <p>
          Lorem ipsum dolor sit amet. Modi impedit, eius vero natus commodi facilis laudantium
          earum. Nulla necessitatibus dicta quo quisquam autem nisi, corporis rerum illo culpa
          voluptatum consequatur!
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.HomePage-AboutSection-root {
  @apply relative bg-current py-10 text-brand-900 shadow-[-50vw_0_currentcolor,50vw_0_currentcolor];
}

.HomePage-AboutSection-header {
  @apply mb-8 text-center text-4xl text-white lg:text-left;
}

.HomePage-AboutSection-body {
  @apply flex flex-col gap-8 lg:flex-row-reverse;

  & > img {
    @apply max-h-72 self-center w-full max-w-xl lg:w-[35%] lg:-translate-y-8;
  }

  & > div {
    @apply flex grow flex-col gap-4 text-white;

    p {
      @apply text-lg;
    }
  }
}
</style>
