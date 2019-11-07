<section class="col-1">
	<section class="busca">
		<form>
			<input type="search" placeholder="Busca..." name="busca">
			<button>OK</button>
		</form>
	</section>
	
	<br>

	<section class="menu-categorias">
		<h2>Categorias</h2>
		<nav>
			<ul>
			<?php
			include_once "includes/categorias.php";
			foreach($CATEGORIAS as $i => $n) {
				echo "<li><a href='index.php?cat=$i'>
				$n</a></li>";
			}

			?>
			</ul>
		</nav>
	</section>
</section>	