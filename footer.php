<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>

<?php if ($this->options->PWA == 'able'): ?>
<div class="tool-bar">
    <div class="tool-bar-inner">
        <!-- <div class="social-share">
        </div> -->
        <div class="site-action">
            <span class="action-item"><a href="javascript:history.back(-1)">←</a></span>
            <span class="action-item"><a href="javascript:history.forward(1)">→</a></span>
            <span class="action-item"><a href="#footer">↓</a></span>
            <span class="action-item"><a href="#">↑</a></span>
        </div>
    </div>
</div>
<?php endif; ?>

<footer id="footer" role="contentinfo">
    <p id="live-time">
        loading···
    </p>
    <p>
        &copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a>.
        <?php _e('Power By  <a href="http://www.typecho.org">Typecho</a> '); ?>.
        <?php _e('<a href="https://github.com/shiyiya/typecho-theme-sagiri" rel="external nofollow">Theme</a> by <a href="https://runtua.cn">Shiyi</a>'); ?>
    </p>
</footer>

<div class="img-view">
    <img src="<?php $this->options->backGroundImage() ?>" alt="This is just a placeholder img.">
</div>

</div><!-- End root -->

<?php $this->footer(); ?>

<canvas id="ribbons"> </canvas>

<canvas id="live2d" class="live2d" width="140" height="250"></canvas>

<script src="<?php $this->options->themeUrl('js/index.min.js'); ?>"></script>

<?php if (!empty($this->options->feature) && in_array('codeHighlight', $this->options->feature)): ?>
<script src="<?php $this->options->themeUrl('./lib/prism/prism.js'); ?>"></script>
<?php endif; ?>

<?php if($_SERVER['HTTP_HOST'] == 'runtua.cn' || $_SERVER['HTTP_HOST'] == 'www.runtua.cn'): ?>
<script src="<?php $this->options->themeUrl('./lib/live2d/live2d.js'); ?>"></script>
<script type="text/javascript">
    loadlive2d("live2d", "<?php $this->options->themeUrl('./lib/live2d/model.json'); ?>");
</script>
<?php endif; ?>

<?php if($this->is('post')) :?>

<script>
    var postScrolltimer = setInterval(postScroll, 10)
</script>
<?php endif; ?>

 <!-- Custom Javascript -->
 <?php _e($this->options->customScript) ?>

<script>
    setInterval(() => liveTime('<?php strval($this->options->liveTime()); ?>'), 1000)
</script>

</body>

</html>