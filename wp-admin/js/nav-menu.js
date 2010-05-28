var wpNavMenu;(function(b){var a=wpNavMenu={options:{menuItemDepthPerLevel:30,globalMaxDepth:11},menuList:undefined,targetList:undefined,menusChanged:false,isRTL:!!("undefined"!=typeof isRtl&&isRtl),init:function(){a.menuList=b("#menu-to-edit");a.targetList=a.menuList;this.jQueryExtensions();this.attachMenuEditListeners();this.setupInputWithDefaultTitle();this.attachQuickSearchListeners();this.attachThemeLocationsListeners();this.attachTabsPanelListeners();this.attachUnsavedChangesListener();if(a.menuList.length){this.initSortables()}this.initToggles();this.initTabManager()},jQueryExtensions:function(){b.fn.extend({menuItemDepth:function(){var c=a.isRTL?this.eq(0).css("margin-right"):this.eq(0).css("margin-left");return a.pxToDepth(c&&-1!=c.indexOf("px")?c.slice(0,-2):0)},updateDepthClass:function(d,c){return this.each(function(){var e=b(this);c=c||e.menuItemDepth();b(this).removeClass("menu-item-depth-"+c).addClass("menu-item-depth-"+d)})},shiftDepthClass:function(c){return this.each(function(){var d=b(this),e=d.menuItemDepth();b(this).removeClass("menu-item-depth-"+e).addClass("menu-item-depth-"+(e+c))})},childMenuItems:function(){var c=b();this.each(function(){var d=b(this),f=d.menuItemDepth(),e=d.next();while(e.length&&e.menuItemDepth()>f){c=c.add(e);e=e.next()}});return c},updateParentMenuItemDBId:function(){return this.each(function(){var e=b(this),c=e.find(".menu-item-data-parent-id"),f=e.menuItemDepth(),d=e.prev();if(f==0){c.val(0)}else{while(d.menuItemDepth()!=f-1){d=d.prev()}c.val(d.find(".menu-item-data-db-id").val())}})},hideAdvancedMenuItemFields:function(){return this.each(function(){var c=b(this);b(".hide-column-tog").not(":checked").each(function(){c.find(".field-"+b(this).val()).addClass("hidden-field")})})},addSelectedToMenu:function(c){return this.each(function(){var e=b(this),d={},g=e.find(".tabs-panel-active .categorychecklist li input:checked"),f=new RegExp("menu-item\\[([^\\]]*)");c=c||a.addMenuItemToBottom;if(!g.length){return false}e.find("img.waiting").show();b(g).each(function(){var i=b(this),h=f.exec(i.attr("name")),j="undefined"==typeof h[1]?0:parseInt(h[1],10);if(this.className&&-1!=this.className.indexOf("add-to-top")){c=a.addMenuItemToTop}d[j]=i.closest("li").getItemData("add-menu-item",j)});a.addItemToMenu(d,c,function(){g.removeAttr("checked");e.find("img.waiting").hide()})})},getItemData:function(f,g){f=f||"menu-item";var d={},e,c=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"];if(!g&&f=="menu-item"){g=this.find(".menu-item-data-db-id").val()}if(!g){return d}this.find("input").each(function(){var h;e=c.length;while(e--){if(f=="menu-item"){h=c[e]+"["+g+"]"}else{if(f=="add-menu-item"){h="menu-item["+g+"]["+c[e]+"]"}}if(this.name&&h==this.name){d[c[e]]=this.value}}});return d},setItemData:function(c,d,e){d=d||"menu-item";if(!e&&d=="menu-item"){e=b(".menu-item-data-db-id",this).val()}if(!e){return this}this.find("input").each(function(){var f=b(this),g;b.each(c,function(h,i){if(d=="menu-item"){g=h+"["+e+"]"}else{if(d=="add-menu-item"){g="menu-item["+e+"]["+h+"]"}}if(g==f.attr("name")){f.val(i)}})});return this}})},initToggles:function(){postboxes.add_postbox_toggles("nav-menus");columns.useCheckboxesForHidden();columns.checked=function(c){b(".field-"+c).removeClass("hidden-field")};columns.unchecked=function(c){b(".field-"+c).addClass("hidden-field")};a.menuList.hideAdvancedMenuItemFields()},initSortables:function(){var m=0,l,j,e,h,n,k,o,d,g,i=a.menuList.offset().left;a.menuList.sortable({handle:".menu-item-handle",placeholder:"sortable-placeholder",start:function(w,v){var p,t,s,q,r,u;if(a.isRTL){v.item[0].style.right="auto"}g=v.item.children(".menu-item-transport");l=v.item.menuItemDepth();f(v,l);s=(v.item.next()[0]==v.placeholder[0])?v.item.next():v.item;q=s.childMenuItems();g.append(q);p=g.outerHeight();p+=(p>0)?(v.placeholder.css("margin-top").slice(0,-2)*1):0;p+=v.helper.outerHeight();d=p;p-=2;v.placeholder.height(p);r=l;q.each(function(){var x=b(this).menuItemDepth();r=(x>r)?x:r});t=v.helper.find(".menu-item-handle").outerWidth();t+=a.depthToPx(r-l);t-=2;v.placeholder.width(t);u=v.placeholder.next();u.css("margin-top",d+"px");v.placeholder.detach();b(this).sortable("refresh");v.item.after(v.placeholder);u.css("margin-top",0);c(v)},stop:function(s,r){var q,p=m-l;q=g.children().insertAfter(r.item);if(p!=0){r.item.updateDepthClass(m);q.shiftDepthClass(p);a.registerChange()}r.item.updateParentMenuItemDBId();r.item[0].style.top=0;if(a.isRTL){r.item[0].style.left="auto";r.item[0].style.right=0}},change:function(q,p){if(!p.placeholder.parent().hasClass("menu")){(h.length)?h.after(p.placeholder):a.menuList.prepend(p.placeholder)}c(p)},sort:function(q,p){var s=p.helper.offset(),r=(a.isRTL?-1:1)*a.pxToDepth(s.left-i);if(r>e||s.top<k){r=e}else{if(r<j){r=j}}if(r!=m){f(p,r)}if(o&&s.top+d>o){n.after(p.placeholder);c(p);b(this).sortable("refreshPositions")}},update:function(q,p){a.registerChange()}});function c(p){var q;h=p.placeholder.prev();n=p.placeholder.next();if(h[0]==p.item[0]){h=h.prev()}if(n[0]==p.item[0]){n=n.next()}k=(h.length)?h.offset().top+h.height():0;o=(n.length)?n.offset().top+n.height()/3:0;j=(n.length)?n.menuItemDepth():0;if(h.length){e=((q=h.menuItemDepth()+1)>a.options.globalMaxDepth)?a.options.globalMaxDepth:q}else{e=0}}function f(p,q){p.placeholder.updateDepthClass(q,m);m=q}},attachMenuEditListeners:function(){var c=this;b("#update-nav-menu").bind("click",function(d){if(d.target&&d.target.className){if(-1!=d.target.className.indexOf("item-edit")){return c.eventOnClickEditLink(d.target)}else{if(-1!=d.target.className.indexOf("menu-save")){return c.eventOnClickMenuSave(d.target)}else{if(-1!=d.target.className.indexOf("menu-delete")){return c.eventOnClickMenuDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-delete")){return c.eventOnClickMenuItemDelete(d.target)}else{if(-1!=d.target.className.indexOf("item-cancel")){return c.eventOnClickCancelLink(d.target)}}}}}}})},setupInputWithDefaultTitle:function(){var c="input-with-default-title";b("."+c).each(function(){var f=b(this),e=f.attr("title"),d=f.val();f.data(c,e);if(""==d){f.val(e)}else{if(e==d){return}else{f.removeClass(c)}}}).focus(function(){var d=b(this);if(d.val()==d.data(c)){d.val("").removeClass(c)}}).blur(function(){var d=b(this);if(""==d.val()){d.addClass(c).val(d.data(c))}})},attachThemeLocationsListeners:function(){var d=b("#nav-menu-theme-locations"),c={};c.action="menu-locations-save";c["menu-settings-column-nonce"]=b("#menu-settings-column-nonce").val();d.find("input[type=submit]").click(function(){d.find("select").each(function(){c[this.name]=b(this).val()});d.find(".waiting").show();b.post(ajaxurl,c,function(e){d.find(".waiting").hide()});return false})},attachQuickSearchListeners:function(){var c;b(".quick-search").keypress(function(f){var d=b(this);if(13==f.which){a.updateQuickSearchResults(d);return false}if(c){clearTimeout(c)}c=setTimeout(function(){a.updateQuickSearchResults(d)},400)}).attr("autocomplete","off")},updateQuickSearchResults:function(d){var c,g,e=2,f=d.val();if(f.length<e){return}c=d.parents(".tabs-panel");g={action:"menu-quick-search","response-format":"markup",menu:b("#menu").val(),"menu-settings-column-nonce":b("#menu-settings-column-nonce").val(),q:f,type:d.attr("name")};b("img.waiting",c).show();b.post(ajaxurl,g,function(h){a.processQuickSearchQueryResponse(h,g,c)})},addCustomLink:function(c){var e=b("#custom-menu-item-url").val(),d=b("#custom-menu-item-name").val();c=c||a.addMenuItemToBottom;if(""==e||"http://"==e){return false}b(".customlinkdiv img.waiting").show();this.addLinkToMenu(e,d,c,function(){b(".customlinkdiv img.waiting").hide();b("#custom-menu-item-name").val("").blur();b("#custom-menu-item-url").val("http://")})},addLinkToMenu:function(e,d,c,f){c=c||a.addMenuItemToBottom;f=f||function(){};a.addItemToMenu({"-1":{"menu-item-type":"custom","menu-item-url":e,"menu-item-title":d}},c,f)},addItemToMenu:function(e,c,g){var f=b("#menu").val(),d=b("#menu-settings-column-nonce").val();c=c||function(){};g=g||function(){};params={action:"add-menu-item",menu:f,"menu-settings-column-nonce":d,"menu-item":e};b.post(ajaxurl,params,function(h){var i=b("#menu-instructions");c(h,params);if(!i.hasClass("menu-instructions-inactive")&&i.siblings().length){i.addClass("menu-instructions-inactive")}g()})},addMenuItemToBottom:function(c,d){b(c).hideAdvancedMenuItemFields().appendTo(a.targetList)},addMenuItemToTop:function(c,d){b(c).hideAdvancedMenuItemFields().prependTo(a.targetList)},attachUnsavedChangesListener:function(){b("#menu-management input, #menu-management select, #menu-management, #menu-management textarea").change(function(){a.registerChange()});window.onbeforeunload=function(){if(a.menusChanged){return navMenuL10n.saveAlert}};b("input.menu-save").click(function(){window.onbeforeunload=null})},registerChange:function(){a.menusChanged=true},attachTabsPanelListeners:function(){b("#menu-settings-column").bind("click",function(h){var f,d,i,c,g=b(h.target);if(g.hasClass("nav-tab-link")){d=/#(.*)$/.exec(h.target.href);if(d&&d[1]){d=d[1]}else{return false}i=g.parents(".inside").first();b("input",i).removeAttr("checked");b(".tabs-panel-active",i).removeClass("tabs-panel-active").addClass("tabs-panel-inactive");b("#"+d,i).removeClass("tabs-panel-inactive").addClass("tabs-panel-active");b(".tabs",i).removeClass("tabs");g.parent().addClass("tabs");b(".quick-search",i).focus();return false}else{if(g.hasClass("select-all")){f=/#(.*)$/.exec(h.target.href);if(f&&f[1]){c=b("#"+f[1]+" .tabs-panel-active .menu-item-title input");if(c.length===c.filter(":checked").length){c.removeAttr("checked")}else{c.attr("checked","checked")}return false}}else{if(g.hasClass("submit-add-to-menu")){a.registerChange();if(h.target.id&&"submit-customlinkdiv"==h.target.id){a.addCustomLink(a.addMenuItemToBottom)}else{if(h.target.id&&-1!=h.target.id.indexOf("submit-")){b("#"+h.target.id.replace(/submit-/,"")).addSelectedToMenu(a.addMenuItemToBottom)}}return false}else{if(g.hasClass("page-numbers")){b.post(ajaxurl,h.target.href.replace(/.*\?/,"").replace(/action=([^&]*)/,"")+"&action=menu-get-metabox",function(m){if(-1==m.indexOf("replace-id")){return}var l=b.parseJSON(m),e=document.getElementById(l["replace-id"]),k=document.createElement("div"),j=document.createElement("div");if(!l.markup||!e){return}j.innerHTML=l.markup?l.markup:"";e.parentNode.insertBefore(k,e);k.parentNode.removeChild(e);k.parentNode.insertBefore(j,k);k.parentNode.removeChild(k)});return false}}}}})},initTabManager:function(){var h=b(".nav-tabs-wrapper"),i=h.children(".nav-tabs"),g=i.children(".nav-tab-active"),l=i.children(".nav-tab"),e=0,m,f,k,d,j=false;function c(){f=h.offset().left;m=f+h.width();g.makeTabVisible()}b.fn.extend({makeTabVisible:function(){var o=this.eq(0),p,n;if(!o.length){return}p=o.offset().left;n=p+o.outerWidth();if(n>m){i.animate({"margin-left":"+="+(m-n)+"px"},"fast")}else{if(p<f){i.animate({"margin-left":"-="+(p-f)+"px"},"fast")}}return o},isTabVisible:function(){var o=this.eq(0),p=o.offset().left,n=p+o.outerWidth();return(n<=m&&p>=f)?true:false}});l.each(function(){e+=b(this).outerWidth(true)});if(e<=h.width()-i.css("padding-left").slice(0,-2)-i.css("padding-right").slice(0,-2)){return}i.css({"margin-right":(-1*e)+"px",padding:0});k=b('<div class="nav-tabs-arrow nav-tabs-arrow-left"><a>&laquo;</a></div>');d=b('<div class="nav-tabs-arrow nav-tabs-arrow-right"><a>&raquo;</a></div>');h.wrap('<div class="nav-tabs-nav"/>').parent().prepend(k).append(d);c();b(window).resize(function(){if(j){return}j=true;setTimeout(function(){c();j=false},1000)});b.each([{arrow:k,next:"next",last:"first",operator:"+="},{arrow:d,next:"prev",last:"last",operator:"-="}],function(){var n=this;this.arrow.mousedown(function(){var p=l[n.last](),o=function(){if(!p.isTabVisible()){i.animate({"margin-left":n.operator+"90px"},300,"linear",o)}};o()}).mouseup(function(){var p,o;i.stop(true);p=l[n.last]();while((o=p[n.next]())&&o.length&&!o.isTabVisible()){p=o}p.makeTabVisible()})})},eventOnClickEditLink:function(d){var c,e,f=/#(.*)$/.exec(d.href);if(f&&f[1]){c=b("#"+f[1]);e=c.parent();if(0!=e.length){if(e.hasClass("menu-item-edit-inactive")){if(!c.data("menu-item-data")){c.data("menu-item-data",c.getItemData())}c.slideDown("fast");e.removeClass("menu-item-edit-inactive").addClass("menu-item-edit-active")}else{c.slideUp("fast");e.removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive")}return false}}},eventOnClickCancelLink:function(d){var c=b(d).closest(".menu-item-settings");c.setItemData(c.data("menu-item-data"));return false},eventOnClickMenuSave:function(c){var d="";b("#nav-menu-theme-locations select").each(function(){d+='<input type="hidden" name="'+this.name+'" value="'+b(this).val()+'" />'});b("#update-nav-menu").append(d);a.menuList.find(".menu-item-data-position").val(function(e){return e+1});return true},eventOnClickMenuDelete:function(c){if(confirm(navMenuL10n.warnDeleteMenu)){return true}else{return false}},eventOnClickMenuItemDelete:function(c){var d=parseInt(c.id.replace("delete-",""),10);a.removeMenuItem(b("#menu-item-"+d));a.registerChange();return false},processQuickSearchQueryResponse:function(g,m,c){var h,e,j,f={},d=document.getElementById("nav-menu-meta"),l=new RegExp("menu-item\\[([^\\]]*)","g"),k=g.match(/<li>.*<\/li>/g);if(!k){b(".categorychecklist",c).html("<li><p>"+navMenuL10n.noResultsFound+"</p></li>");b("img.waiting",c).hide();return}h=k.length;while(h--){e=l.exec(k[h]);if(e&&e[1]){j=e[1];while(d.elements["menu-item["+j+"][menu-item-type]"]||f[j]){j--}f[j]=true;if(j!=e[1]){k[h]=k[h].replace(new RegExp("menu-item\\["+e[1]+"\\]","g"),"menu-item["+j+"]")}}}b(".categorychecklist",c).html(k.join(""));b("img.waiting",c).hide()},removeMenuItem:function(d){var c=d.childMenuItems();d.addClass("deleting").animate({opacity:0,height:0},350,function(){var e=b("#menu-instructions");d.remove();c.shiftDepthClass(-1).updateParentMenuItemDBId();if(!e.siblings().length){e.removeClass("menu-instructions-inactive")}})},depthToPx:function(c){return c*a.options.menuItemDepthPerLevel},pxToDepth:function(c){return Math.floor(c/a.options.menuItemDepthPerLevel)}};b(document).ready(function(){wpNavMenu.init()})})(jQuery);