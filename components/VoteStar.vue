<template>
    <ClientOnly>
        <div class="w-full h-full flex justify-center items-center">
            <div class="w-auto text-center">
                <div class="w-full">
                    <fieldset class="rating">
                        <input type="radio" id="star5" hidden name="rating" value="5"/>
                        <label for="star5" class="full text-[48px]" title="Awesome"></label>

                        <input type="radio" id="star4.5" hidden name="rating" value="4.5"/>
                        <label for="star4.5" class="half text-[50px]"></label>

                        <input type="radio" id="star4" hidden name="rating" value="4"/>
                        <label for="star4" class="full text-[48px]"></label>

                        <input type="radio" id="star3.5" hidden name="rating" value="3.5"/>
                        <label for="star3.5" class="half text-[50px]"></label>

                        <input type="radio" id="star3" hidden name="rating" value="3"/>
                        <label for="star3" class="full text-[48px]"></label>

                        <input type="radio" id="star2.5" hidden name="rating" value="2.5"/>
                        <label for="star2.5" class="half text-[50px]"></label>

                        <input type="radio" id="star2" hidden name="rating" value="2"/>
                        <label for="star2" class="full text-[48px]"></label>

                        <input type="radio" id="star1.5" hidden name="rating" value="1.5"/>
                        <label for="star1.5" class="half text-[50px]"></label>

                        <input type="radio" id="star1" hidden name="rating" value="1"/>
                        <label for="star1" class="full text-[48px]"></label>

                        <input type="radio" id="star0.5" hidden name="rating" value="0.5"/>
                        <label for="star0.5" class="half text-[50px]"></label>
                    </fieldset>
                </div>
            </div>
	</div>
    </ClientOnly>
</template>
<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css);

/*styling star rating*/
.rating{
	border: none;
}

.rating > input{
	display: none;
}

.rating > label:before{
	content: '\f005';
	font-family: FontAwesome;
    margin-left: 8px;
    margin-right: 8px;
	display: inline-block;
	cursor: pointer;
}

.rating > .half:before{
	content: '\f089';
	position: absolute;
	cursor: pointer;
}


.rating > label{
	color: #ddd;
	float: right;
	cursor: pointer;
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover, 
.rating:not(:checked) > label:hover ~ label{
	color: #F9A825;
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label{
	color: #F9A825;
}

</style>

<script setup>
let star = document.querySelectorAll('input');

for (let i = 0; i < star.length; i++) {
	star[i].addEventListener('click', function() {
		i = this.value;

	});
}
</script>