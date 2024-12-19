<script lang="ts">
    import emblaCarouselSvelte from "embla-carousel-svelte";

    let { banner }: { banner: Banner | Banner[] } = $props();

    type Alignment = "center" | "right" | "top" | "bottom" | "left" | undefined;

    interface Banner {
        title: string;
        content: string;
        image: string;
        alignment: Alignment;
        titleColor: "white" | "black";
        contentColor: "white" | "black";
        link?: string;
    }

    const setPosition = (textAlignment: Alignment) => {
        switch (textAlignment) {
            case "center":
                return "w-1/2 text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
            case "right":
                return "w-1/2 text-right top-1/2 right-4 transform -translate-y-1/2";
            case "top":
                return "w-1/2 text-center top-4 left-1/2 transform -translate-x-1/2";
            case "bottom":
                return "w-1/2 text-center bottom-4 left-1/2 transform -translate-x-1/2";
            case "left":
                return "w-1/2 text-left top-1/2 left-4 transform -translate-y-1/2";
            default:
                return "w-1/2 text-left top-1/2 left-4 transform -translate-y-1/2";
        }
    };
</script>

{#if !Array.isArray(banner)}
    <a href={banner.link ? banner.link : null}>
        <div
            class="relative w-full h-[50vh] max-h-[50vh] bg-cover bg-center rounded-lg"
            style={`background-image: url(${banner.image})`}
        >
            <div
                class="absolute text-white px-4 py-2 rounded {setPosition(
                    banner.alignment,
                )}"
            >
                <h1 class="text-[36px]" style:color={banner.titleColor}>
                    {banner.title}
                </h1>
                <p style:color={banner.contentColor}>{banner.content}</p>
            </div>
        </div>
    </a>
{:else}
    <div
        class="overflow-hidden mr-[-16px] sm:mr-[-32px]"
        use:emblaCarouselSvelte={{
            options: {},
            plugins: [],
        }}
    >
        <div class="flex h-full w-[90%] sm:w-[96%] gap-4">
            {#each banner as banner}
                <a
                    href={banner.link ? banner.link : null}
                    style:flex="0 0 100%"
                >
                    <div
                        class="relative w-full h-[50vh] max-h-[50vh] bg-cover bg-center rounded-lg"
                        style="background-image: url({banner.image})"
                    >
                        <div
                            class="absolute text-white px-4 py-2 rounded {setPosition(
                                banner.alignment,
                            )}"
                        >
                            <h1
                                class="text-[36px]"
                                style:color={banner.titleColor}
                            >
                                {banner.title}
                            </h1>
                            <p style:color={banner.contentColor}>
                                {banner.content}
                            </p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
{/if}
