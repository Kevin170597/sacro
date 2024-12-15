<script lang="ts">
    import { SocialMediaIcon } from "$lib/components/icons";
</script>

<div class="bg-white py-8 px-4 border border-t-2 flex flex-col gap-8">
    <div class="flex flex-col justify-center items-center gap-4">
        <h2 class="text-[32px] font-bold">Sacro</h2>
        <p class="text-[13px] text-center">
            Somos una marca <b>argentina</b> que ofrece productos de alta calidad
            y precios muy competitivos.
        </p>
    </div>
    <div class="flex">
        <div class="w-1/2 flex flex-col gap-2 items-center">
            <b class="mb-2">Seguinos</b>
            <div class="flex gap-4 sm:gap-8">
                <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61563279825598"
                >
                    <SocialMediaIcon socialMedia="fb" />
                </a>
                <a
                    target="_blank"
                    href="https://www.instagram.com/sacro.ar"
                >
                    <SocialMediaIcon socialMedia="ig" />
                </a>
                <a
                    target="_blank"
                    href="https://api.whatsapp.com/send?phone=541154105057&text=Hola,%20estoy%20interesado%20en%20uno%20de%20sus%20productos.%20%C2%BFMe%20pueden%20ayudar%20con%20m%C3%A1s%20informaci%C3%B3n?"
                >
                    <SocialMediaIcon socialMedia="wpp" />
                </a>
            </div>
        </div>
        <div class="w-1/2 flex flex-col gap-2 items-center">
            <b class="mb-2">Escribinos</b>
            <a
                class="text-blue-500 hover:underline text-[12px] sm:text-[14px]"
                href="https://api.whatsapp.com/send?phone=541154105057&text=Hola,%20estoy%20interesado%20en%20uno%20de%20sus%20productos.%20%C2%BFMe%20pueden%20ayudar%20con%20m%C3%A1s%20informaci%C3%B3n?"
            >
                11 5410-5057
            </a>
            <a
                class="text-blue-500 hover:underline text-[12px] sm:text-[14px]"
                href="mailto:sacro.arg@gmail.com"
            >
                sacro.arg@gmail.com
            </a>
        </div>
    </div>
</div>