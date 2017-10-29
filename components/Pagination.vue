<template id="pagination-template">
  <ul class="uk-pagination" uk-margin>
    <li class="uk-margin-auto-right"><a href="#" v-if="hasPrev()" @click.prevent="changePage(prevPage)"><span uk-pagination-previous></span> Previous</a></li>
    <li v-if="hasFirst()"><a href="#" @click.prevent="changePage(1)">1</a></li>
    <li v-if="hasFirst()" class="uk-disabled"><span>...</span></li>
    <li v-for="page in pages" :class="{ 'uk-active': current == page }">
      <a href="#" @click.prevent="changePage(page)">
        {{ page }}
      </a>
    </li>
    <li v-if="hasLast()" class="uk-disabled">...</li>
    <li v-if="hasLast()"><a href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a></li>
    <li class="uk-margin-auto-left"><a href="#" v-if="hasNext()" @click.prevent="changePage(nextPage)">Next <span uk-pagination-next></span></a></li>
  </ul>
</template>
<script>
  export default {
    template: '#pagination-template',
    props: {
      current: {
        type: Number,
        default: 1
      },
      totalPages: {
        type: Number,
        default: 0
      },
      perPage: {
        type: Number,
        default: 9
      },
      pageRange: {
        type: Number,
        default: 2
      }
    },
    computed: {
      pages: function () {
        var pages = []
        for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i)
        }
        return pages
      },
      rangeStart: function () {
        var start = this.current - this.pageRange

        return (start > 0) ? start : 1
      },
      rangeEnd: function () {
        var end = this.current + this.pageRange

        return (end < this.totalPages) ? end : this.totalPages
      },
      nextPage: function () {
        return this.current + 1
      },
      prevPage: function () {
        return this.current - 1
      }
    },
    methods: {
      hasFirst: function () {
        return this.rangeStart !== 1
      },
      hasLast: function () {
        return this.rangeEnd < this.totalPages
      },
      hasPrev: function () {
        return this.current > 1
      },
      hasNext: function () {
        return this.current < this.totalPages
      },
      changePage: function (page) {
        this.$emit('page-changed', page)
      }
    }
  }
</script>
