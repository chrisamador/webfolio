define(["utls","sls"],function(e,t){return function(){$form=$("#contact-form"),$message=$(".form__message"),$form.on("submit",function(a){function o(t){0==t.value.length?(e(t).addClass("alert alert-danger"),r.push(!1)):(e(t).removeClass("alert alert-danger"),r.push(!0))}a.preventDefault();var n={name:document.getElementById("name"),email:document.getElementById("email"),thoughts:document.getElementById("thoughts")},r=[];for(var s in n)o(n[s]);if(r.toString().indexOf("false")<0){t.add();var l={name:n.name.value,email:n.email.value,thoughts:n.thoughts.value};$.ajax({method:"POST",url:"https://api.fieldbook.com/v1/585034af66b9c80300b46250/contact_form",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Basic "+btoa("key-1:_BTyP7EQAQT3oeAI_z0K")},data:JSON.stringify(l),success:function(e){console.log(e),$message.text("Thank you, your message has been received"),t.remove()},error:function(e){$message.text("An error happen, please email directly: hello@chrisamador.me or try again."),t.remove()}})}else console.log("sorry no")})}});