angular.module('app').controller("HomeController", HomeController);
HomeController.$inject = ['$location', 'CursoService', '$rootScope'];

    function HomeController($location, CursoService, $rootScope){
        vm = this
        vm.texto = "1"
        vm.texto2 = 1
        vm.clientes = ''
        vm.erro = false

        vm.init = function(){
            vm.listarClientes()
        }     

        vm.navegar = function(rota, id){
            $location.path(rota + '/' +id)
        }

        vm.listarClientes = function(){
            CursoService.exec_GET().then(function(resposta){
                if(resposta){
                    vm.clientes = resposta
                }else{
                    vm.erro = true
                }
            })
        }

        vm.excluir = function(id){
            CursoService.exec_DEL(id).then(function(resposta){
                if(resposta){
                    // Mensagem Resposta
                }
            })
        }

        vm.editar = function(id){
            vm.navegar('Cadastro', id)
        }

       
    }