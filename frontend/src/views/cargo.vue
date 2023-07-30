<template lang="pug">
.cargo
    .cargo-gradient
        .cargo-container 
            .cargo-logo 
                Logo(
                    width=126
                    height=101
                ) 
            .cargo-info
                h4.cargo-title Kargo
                p.cargo-content Türkiye sınırları içinde her yere teslimat yapılır.
                p.cargo-content Siparişleriniz 1-5 iş günü içerisinde kargolanır. Siparişiniz size bildirilecek olan kargo firmasıyla gönderilir ve takip numarası mail yoluyla sistem üzerinden sizinle paylaşılır.
                p.cargo-content |Kargo takibi hakkındaki sorularınızı 
                                | #[a(href='mailto:hello@lokyyy.shop') hello@lokyyy.shop]
                                |adresine gönderebilirsiniz.
                h4.cargo-title İade
                p.cargo-content |Ayıplı ya da hasarlı mal teslim alındıktan sonraki 14 gün 
                                |içerisinde iade edilebilmektedir. Ürünün iadesinin yapılabilmesi için, 
                                |sisteme üye girişi yaptıktan sonra "Siparişlerim" kısmından iade talebi oluşturabilirsiniz.
                p.cargo-content |Üye olmadan satın aldıysanız iade isteğinizi İade başlığıyla 
                                |#[a(href='mailto:hello@lokyyy.shop') hello@lokyyy.shop]'a yazabilirsiniz.                
                p.cargo-content |İade süreciniz onaylandığında sizlere iletilecek iade kodunu kullanarak 
                                |depomuza geri gönderimi gerçekleştirebilirsiniz.
                                |Ayıplı ya da hasarlı mal iadesi dışında yapılacak iadelerde kargo ücreti tarafınıza yansıyacaktır.
                p.cargo-content |Ürün bedeli iadesi yanlızca ödeme yapılan karta yapılmaktadır. 
                                |Ürünü satın alırken kullandığınız kart/banka hesabına 1-3 gün içerisinde iadesi yapılır.
                p.cargo-content | Hesabınıza geçmesi ise 5-10 iş günü sürebilir. Böyle bir durumda öncelikle bizimle, daha sonra gerekirse bankanızla iletişime geçebilirsiniz. 
                                |Sorularınız için hello@loky.shop adresinize veya Contact sayfasından yazabilirsiniz.
            


            .cargo-title 
            .cargo-content 
</template>
<script>
import Logo from '../components/logo.vue';
export default {
    name: "Cargo",
    components: {
        Logo
    }
}
</script>
<style lang="css">
.cargo-gradient::before {
    content: "";
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 75%);
    z-index: 5;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100vw;
    height: 30vh;
}
.cargo-gradient {
    display: flex;
    justify-content: center;
    height: 100vh;
}
.cargo-gradient::after {
    content: "";
    background: linear-gradient(180deg, rgba(255,255,255,0) 25%, rgba(255,255,255,1) 100%);
    z-index: 5;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 30vh;
}
.cargo {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    background: rgba(255, 77, 0, 0.520833);
}

.cargo-container {
    position: absolute;
    padding-top: 214px;
    padding-bottom: 214px;
    box-sizing: border-box;
    width: 467px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: scroll;
    z-index: 1;
}
::-webkit-scrollbar {
    display: none;
}
.cargo-title {
    font-size: 24px;
    line-height: 28.8px;
}

.cargo-content, .cargo-content > a {
    font-size: 18px;
    color: inherit;
}
</style>